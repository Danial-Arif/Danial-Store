import connection from "../../../../DB/route";
import Product from "../../../../Schema/Product/route"; 
import { NextResponse } from "next/server";


export async function GET(request) {
  await connection();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 9;
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ products, totalPages, currentPage: page }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connection();
  try {
    const data = await request.json();
    const newProduct = new Product(data);
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
