import { Product } from "@/types/index";
import Image from "next/image";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.products || [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold text-blue-800">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            {product.imageUrl && (
              <img
                src={`/products/${product.imageUrl}.png`}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-60 object-contain rounded mb-4"
              />
            )}
            <p className="text-gray-700 mb-1">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Composition:</strong> {product.composition}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Dosage:</strong> {product.dosage}
            </p>
            <p className="text-gray-700">
              <strong>Indications:</strong>{" "}
              {Array.isArray(product.indications)
                ? product.indications.join(", ")
                : product.indications}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
