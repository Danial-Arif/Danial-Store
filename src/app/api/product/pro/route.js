import connectDB from "../../../../DB/route"
import Product from "../../../../Schema/Product/route";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const newProduct = new Product(data);
    await newProduct.save();
    return NextResponse.json({ message: "Product added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find(); 
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
