import dotenv from 'dotenv';
import express from 'express';
import { RegisterRoutes } from './generated/routes';
import swaggerUi from 'swagger-ui-express';
import { connectToDatabase } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Register TSOA routes
RegisterRoutes(app);

// Swagger documentation (will be available after generating routes)
try {
    const swaggerDocument = require('./generated/swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
    console.log('Swagger documentation not available yet. Run npm run build to generate it.');
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server with database connection
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectToDatabase();

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Health check: http://localhost:${port}/health`);
            console.log(`API Documentation: http://localhost:${port}/docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;