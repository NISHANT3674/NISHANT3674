import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";

// GET /api/products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
