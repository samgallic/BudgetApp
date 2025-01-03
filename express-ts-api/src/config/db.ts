import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/express-ts-api');
    console.log('MongoDB connected');

    const db = connection.connection.db;

    if (!db) {
      throw new Error('Database connection not initialized');
    }

    // Drop and recreate the unique index on the email field
    try {
      await db.collection('users').dropIndexes(); // Drop all indexes on the users collection
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      console.log('Unique index on email recreated');
    } catch (error) {
      console.error('Error creating index:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error connecting to MongoDB or setting up indexes:', error);
    process.exit(1);
  }
};

export default connectDB;
