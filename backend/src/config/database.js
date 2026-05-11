import mongoose from "mongoose";

// Establish MongoDB connection via Mongoose — exit if it fails (no DB, no service)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
