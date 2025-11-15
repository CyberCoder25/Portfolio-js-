import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check for both environment variable names
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in .env file');
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${conn.connection.db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;