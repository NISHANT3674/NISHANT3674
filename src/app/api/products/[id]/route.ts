import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";

// PUT /api/products/:id
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Extract ID from URL
    const id = req.url.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing product ID" },
        { status: 400 }
      );
    }

    await Product.findByIdAndUpdate(id, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    // Extract ID from URL
    const id = req.url.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing product ID" },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const product = await Product.findById(params.id);
  return NextResponse.json({ success: true, product });
}
