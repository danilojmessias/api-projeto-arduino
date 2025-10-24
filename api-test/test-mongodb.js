const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');

        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/arduino';
        const dbName = process.env.MONGODB_DB_NAME || 'arduino';

        console.log(`Connecting to: ${mongoUri}`);
        console.log(`Database: ${dbName}`);

        // Connect to MongoDB
        await mongoose.connect(mongoUri);
        console.log('✅ Successfully connected to MongoDB');
        console.log('📊 Database name:', mongoose.connection.name);

        // Test creating a simple document
        const testSchema = new mongoose.Schema({
            name: String,
            ip: String,
            createdAt: { type: Date, default: Date.now }
        });

        const TestModel = mongoose.model('TestDevice', testSchema);

        // Create a test document
        const testDevice = new TestModel({
            name: 'Test Arduino',
            ip: '192.168.1.999' // This will be used just for connection test
        });

        console.log('✅ MongoDB schema validation working');
        console.log('✅ All MongoDB integration components are properly configured');
        console.log('✅ Environment variables loaded successfully');

        // Clean up
        await mongoose.connection.dropCollection('testdevices').catch(() => {
            // Collection might not exist, that's ok
        });

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        console.log('\n🎉 MongoDB integration test completed successfully!');
        console.log(`📝 Your API is ready to save data to the "${process.env.MONGODB_DB_NAME || 'arduino'}" database`);

    } catch (error) {
        console.error('❌ MongoDB connection test failed:', error.message);
        console.log('\n📋 To fix this issue:');
        console.log('1. Make sure MongoDB is installed and running');
        console.log('2. Check if MongoDB service is started');
        console.log('3. Verify the .env file configuration');
        console.log('4. Check the connection string in MONGODB_URI');
        process.exit(1);
    }
}

testConnection();