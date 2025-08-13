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
  const { id } = await params; // ✅ Await because Next.js 15 passes it as a Promise

  await connectDB();

  const products = await ProductModel.find().lean<Product[]>();
  const index = products.findIndex((p) => p._id.toString() === id);

  if (index === -1) return notFound();

  const product = products[index];
  const prevProduct = index > 0 ? products[index - 1] : null;
  const nextProduct = index < products.length - 1 ? products[index + 1] : null;

  return (
    <main className="max-w-5xl mx-auto  pt-2">
      <div className="flex justify-between items-center mt-8">
        {prevProduct ? (
          <Link
            href={`/products/${prevProduct._id}`}
            className="text-blue-600 hover:underline p-2"
          >
            <FaCircleArrowLeft size={50} color="#1B3F5F" />
          </Link>
        ) : (
          <div />
        )}
        <ProductDetail product={{ ...product, _id: product._id.toString() }} />
        {nextProduct ? (
          <Link
            href={`/products/${nextProduct._id}`}
            className="text-blue-600 hover:underline p-2"
          >
            <FaCircleArrowRight size={50} color="#1B3F5F" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
