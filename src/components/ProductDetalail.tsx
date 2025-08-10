// src/components/ProductDetail.tsx

import Image from "next/image";
import { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {/* Product Image */}
      {product.imageUrl && (
        <div className="relative w-full h-80">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {product.name}
        </h1>

        {product.quantity && (
          <p className="text-sm text-gray-500 mt-1">
            Quantity: {product.quantity}
          </p>
        )}

        {product.category && (
          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category}
          </p>
        )}

        {product.description && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {product.description}
          </p>
        )}

        {product.composition && (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Composition
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {product.composition}
            </p>
          </div>
        )}

        {product.dosage && (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Dosage
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{product.dosage}</p>
          </div>
        )}

        {product.indications && (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Indications
            </h2>
            {Array.isArray(product.indications) ? (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {product.indications.map((indication, idx) => (
                  <li key={idx}>{indication}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {product.indications}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
