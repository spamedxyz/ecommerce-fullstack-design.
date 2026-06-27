import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI || (process.env.NODE_ENV === 'production' ? undefined : 'mongodb://127.0.0.1:27017/ecommerce-fullstack');

  if (!uri) {
    throw new Error('Missing required MONGODB_URI environment variable for production deployment.');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 15000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
