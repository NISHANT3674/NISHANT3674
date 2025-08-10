// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/types";
import ProductModel from "@/models/product";
import ProductDetail from "@/components/ProductDetalails";

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  await connectDB();

  // Fetch all products
  const products = await ProductModel.find().lean<Product[]>();

  // Find the current product index
  const index = products.findIndex((p) => p._id.toString() === params.id);

  if (index === -1) return notFound();

  const product = products[index];
  const prevProduct = index > 0 ? products[index - 1] : null;
  const nextProduct = index < products.length - 1 ? products[index + 1] : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Product details */}
      <ProductDetail product={{ ...product, _id: product._id.toString() }} />

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {prevProduct ? (
          <Link
            href={`/products/${prevProduct._id}`}
            className="text-blue-600 hover:underline"
          >
            ← {prevProduct.name}
          </Link>
        ) : (
          <div />
        )}
        {nextProduct ? (
          <Link
            href={`/products/${nextProduct._id}`}
            className="text-blue-600 hover:underline"
          >
            {nextProduct.name} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
