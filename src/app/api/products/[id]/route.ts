import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";

// Helper to extract ID from URL pathname
const extractIdFromUrl = (req: NextRequest) => {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1]; // last segment is the ID
};

// PUT /api/products/:id
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const id = extractIdFromUrl(req);
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

    const id = extractIdFromUrl(req);
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

// GET /api/products/:id
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = extractIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
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
