// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/product";
import { Product } from "@/types";
import ProductDetail from "@/components/ProductDetail";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const products = await ProductModel.find().lean<Product[]>();
  if (!products.length) return notFound();

  const index = products.findIndex((p) => p._id.toString() === id);
  if (index === -1) return notFound();

  const product = products[index];

  // ♻ Infinite loop logic
  const prevProduct =
    index === 0 ? products[products.length - 1] : products[index - 1];
  const nextProduct =
    index === products.length - 1 ? products[0] : products[index + 1];

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* Product Detail */}
      <ProductDetail product={{ ...product, _id: product._id.toString() }} />

      {/* Navigation Arrows */}
      <div className="mt-8 flex justify-between items-center">
        <Link
          href={`/products/${prevProduct._id}`}
          className="flex items-center gap-2 text-blue-600 dark:text-yellow-300 hover:underline"
        >
          <FaCircleArrowLeft size={40} className="drop-shadow-sm" />
          <span className="hidden sm:inline">{prevProduct.name}</span>
        </Link>

        <Link
          href={`/products/${nextProduct._id}`}
          className="flex items-center gap-2 text-blue-600 dark:text-yellow-300 hover:underline"
        >
          <span className="hidden sm:inline">{nextProduct.name}</span>
          <FaCircleArrowRight size={40} className="drop-shadow-sm" />
        </Link>
      </div>
    </main>
  );
}
