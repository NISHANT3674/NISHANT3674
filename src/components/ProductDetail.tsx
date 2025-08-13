import Image from "next/image";
import { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
  prevProduct?: Product;
  nextProduct?: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="max-w-5xl mx-auto bg-white dark:bg-[#1B3F5F] border border-gray-200 dark:border-gray-700 rounded-lg shadow-md print:shadow-none print:border-none">
      {/* Title */}
      <header className="border-b border-gray-300 dark:border-gray-700 p-4">
        <h1 className="text-3xl font-serif text-gray-900 dark:text-white print:text-2xl">
          {product.name}
        </h1>
        {product.category && (
          <p className="text-sm text-gray-500 mt-1 ">{product.category}</p>
        )}
      </header>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Image container with fixed ratio */}
        {product.imageUrl && (
          <div
            className="relative w-full bg-white"
            style={{ paddingBottom: "100%" }}
          >
            <Image
              src={`/products/${product.imageUrl}.png`}
              alt={product.name}
              fill
              className="w-full h-60 object-contain drop-shadow-xl/25 rounded p-2"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col space-y-4 text-gray-700 dark:text-gray-300">
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
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                Composition
              </h2>
              <p>{product.composition}</p>
            </section>
          )}
          {product.dosage && (
            <section>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                Dosage
              </h2>
              <p>{product.dosage}</p>
            </section>
          )}
          {product.indications && (
            <section>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                Indications
              </h2>
              {Array.isArray(product.indications) ? (
                <ul className="list-disc list-inside">
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
