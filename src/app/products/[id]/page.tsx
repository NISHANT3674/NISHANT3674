import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import { Product as ProductInterface } from "@/types/index";
import ProductModel from "@/models/product";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const products: ProductInterface[] = await ProductModel.find().lean<
    ProductInterface[]
  >();

  const index = products.findIndex((p) => p._id.toString() === params.id);

  if (index === -1) return notFound();

  const product = products[index];
  const prevProduct = products[index - 1];
  const nextProduct = products[index + 1];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-[#1B3F5F]">
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          {product.imageUrl && (
            <Image
              src={`/products/${product.imageUrl}.png`}
              alt={product.name}
              width={200}
              height={100}
              className="mb-4 object-contain rounded shadow"
            />
          )}
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-2">{product.description}</p>
          <ul className="space-y-2 mb-6">
            <li>
              <strong>Composition:</strong> {product.composition}
            </li>
            <li>
              <strong>Dosage:</strong> {product.dosage}
            </li>
            <li>
              <strong>Indications:</strong>{" "}
              {Array.isArray(product.indications)
                ? product.indications.join(", ")
                : product.indications}
            </li>
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Quantity:</strong> {product.quantity}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
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
