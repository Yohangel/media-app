import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scalableMediaApp');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
        console.error(error.message); 
      } else {
        console.error("Unknown error", error); 
      }
    process.exit(1);
  }
};

export default connectDB;
