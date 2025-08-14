// src/components/ProductDetail.tsx
import Image from "next/image";
import { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="bg-white dark:bg-[#1B3F5F] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden print:shadow-none print:border-none transition-all duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-[#1B3F5F] border-b border-gray-300 dark:border-gray-700 p-4 shadow-sm">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold font-serif text-gray-900 dark:text-white">
          {product.name}
        </h1>
        {product.category && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {product.category}
          </p>
        )}
      </header>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6 p-5">
        {/* Image Section */}
        {product.imageUrl && (
          <div className="relative w-full bg-white dark:bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <Image
                src={`/products/${product.imageUrl}.png`}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="flex flex-col space-y-4 text-gray-700 dark:text-gray-200 text-sm md:text-base">
          {product.quantity && (
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {product.quantity}
            </p>
          )}
          {product.description && (
            <p className="leading-relaxed">{product.description}</p>
          )}

          {product.composition && (
            <section>
              <h2 className="text-lg font-semibold mb-1">Composition</h2>
              <p>{product.composition}</p>
            </section>
          )}

          {product.dosage && (
            <section>
              <h2 className="text-lg font-semibold mb-1">Dosage</h2>
              <p>{product.dosage}</p>
            </section>
          )}

          {product.indications && (
            <section>
              <h2 className="text-lg font-semibold mb-1">Indications</h2>
              {Array.isArray(product.indications) ? (
                <ul className="list-disc list-inside space-y-1">
                  {product.indications.map((indication, idx) => (
                    <li key={idx}>{indication}</li>
                  ))}
                </ul>
              ) : (
                <p>{product.indications}</p>
              )}
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
