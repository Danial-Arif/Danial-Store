import mongoose from "mongoose";

const connection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    throw error;
  }
};

export default connection;
