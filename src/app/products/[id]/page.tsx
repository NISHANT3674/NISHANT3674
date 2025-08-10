// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/product";
import { Product } from "@/types";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Await because Next.js 15 passes it as a Promise

  await connectDB();

  const products = await ProductModel.find().lean<Product[]>();
  const index = products.findIndex((p) => p._id.toString() === id);

  if (index === -1) return notFound();

  const product = products[index];
  const prevProduct = index > 0 ? products[index - 1] : null;
  const nextProduct = index < products.length - 1 ? products[index + 1] : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <ProductDetail product={{ ...product, _id: product._id.toString() }} />

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
