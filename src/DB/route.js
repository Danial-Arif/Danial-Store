import mongoose from "mongoose";

const connection = {}; // this keeps track of the connection

async function connectDB() {   // rename the function
  if (connection.isConnected) return;

  const uri = process.env.MONGODB_URL;
  if (!uri) throw new Error("MONGODB_URL is not defined");

  try {
    await mongoose.connect(uri);
    connection.isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB Atlas:", err);
  }
}

export default connectDB;
