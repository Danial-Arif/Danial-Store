// src/app/api/Schema/Orders/route.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"], // 👈 lowercase
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
