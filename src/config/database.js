import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables - only in Node.js environment
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (isNode) {
  dotenv.config();
}

// MongoDB connection URI - handle both Node.js and browser environments
const MONGODB_URI = (isNode && process.env.MONGODB_URI) || 'mongodb://localhost:27017/hopee';

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (isNode) {
      process.exit(1);
    } else {
      throw error; // In browser, throw the error for handling by the application
    }
  }
};

/**
 * Disconnect from MongoDB database
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error(`Error disconnecting from MongoDB: ${error.message}`);
  }
};

export { connectDB, disconnectDB };