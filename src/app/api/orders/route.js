import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connection from "../../../DB/route"
import Order from "../../../Schema/Orders/route"; 
import User from "../../../Schema/Accounts/route"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export async function POST(req) {
  await connection();

  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { productName, amount } = await req.json();
    const userInDb = await User.findOne({ email: session.user.email });
    if (!userInDb) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newOrder = new Order({
      user: userInDb._id,
      customerName: session.user.name, // 👈 FIX: Add this
      productName,
      amount,
      status: "pending", // 👈 FIX: match schema enum
    });

    await newOrder.save();
    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  console.log("GET /api/orders called");
  await connection();

  try {
    const session = await getServerSession(authOptions);
    console.log("API Session:", session);
    
    if (!session) {
      console.log("No session found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userInDb = await User.findOne({ email: session.user.email });
    console.log("User found:", userInDb?._id);
    
    if (!userInDb) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await Order.find({ user: userInDb._id }).populate("user", "name email");
    console.log("Orders found:", orders.length);
    
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Orders fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}