# Arduino API with MongoDB Integration

This API project has been configured to save device information to a MongoDB database called "arduino".

## Prerequisites

1. **MongoDB Installation**: Make sure MongoDB is installed and running on your system
   - For macOS: `brew install mongodb-community` and `brew services start mongodb-community`
   - For Ubuntu: `sudo apt install mongodb` and `sudo systemctl start mongodb`
   - For Windows: Download from [MongoDB official website](https://www.mongodb.com/try/download/community)

2. **Node.js**: Make sure you have Node.js installed (version 14 or higher)

## Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/arduino
MONGODB_DB_NAME=arduino

# Server Configuration
PORT=3002
NODE_ENV=development

# Application Settings
APP_NAME=Arduino API
APP_VERSION=1.0.0
```

## Database Configuration

The application connects to MongoDB using environment variables:
- **Database URL**: Configured via `MONGODB_URI` (default: `mongodb://localhost:27017/arduino`)
- **Database Name**: Configured via `MONGODB_DB_NAME` (default: `arduino`)
- **Collection**: `devices`

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env file with your settings
```

3. Build the project:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### GET /devices
Retrieves all devices from the MongoDB database.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Arduino Uno",
    "ip": "192.168.1.100",
    "createdAt": "2023-10-22T19:30:00.000Z"
  }
]
```

### POST /devices
Creates a new device in the MongoDB database.

**Request Body:**
```json
{
  "name": "Arduino Uno",
  "ip": "192.168.1.100"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Arduino Uno",
  "ip": "192.168.1.100",
  "createdAt": "2023-10-22T19:30:00.000Z"
}
```

## Features

- **MongoDB Integration**: All device data is persisted in MongoDB
- **Data Validation**: IP addresses are validated using regex patterns
- **Unique Constraints**: IP addresses must be unique across devices
- **Error Handling**: Comprehensive error handling for database operations
- **Automatic Timestamps**: `createdAt` and `updatedAt` fields are automatically managed
- **API Documentation**: Swagger documentation available at `/docs`

## Testing the API

1. **Health Check**: `GET http://localhost:3002/health`
2. **Get All Devices**: `GET http://localhost:3002/devices`
3. **Create Device**: `POST http://localhost:3002/devices`
4. **API Documentation**: `http://localhost:3002/docs`

## MongoDB Database Structure

The `arduino` database contains a `devices` collection with the following schema:

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 characters),
  ip: String (required, unique, validated IP format),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

All configuration is managed through environment variables in the `.env` file:

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/arduino`)
- `MONGODB_DB_NAME`: Database name (default: `arduino`)
- `PORT`: Server port (default: `3002`)
- `NODE_ENV`: Environment mode (development/production)
- `APP_NAME`: Application name
- `APP_VERSION`: Application version

**Important**: Never commit the `.env` file to version control. Use `.env.example` as a template.

## Error Handling

The API handles various error scenarios:
- **Duplicate IP**: Returns error if IP address already exists
- **Invalid IP**: Returns error if IP format is invalid
- **Validation Errors**: Returns detailed validation error messages
- **Database Connection**: Graceful handling of database connection issues