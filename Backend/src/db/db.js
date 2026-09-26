import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
  try {
    // The server cannot serve requests without its MongoDB data store.
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;