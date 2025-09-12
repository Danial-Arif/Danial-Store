import { NextResponse } from "next/server";
import connectDB from "../../../../DB/route";
import Product from "../../../../Schema/Product/route";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching product", error: error.message }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product updated", product: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
