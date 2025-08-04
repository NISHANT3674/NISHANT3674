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

// ✅ Correct GET handler
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = context.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching product" },
      { status: 500 }
    );
  }
}
