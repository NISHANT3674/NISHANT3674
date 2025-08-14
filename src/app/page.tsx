"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider";

type Product = {
  _id: string;
  name: string;
  category?: string;
  imageUrl?: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [res] = await Promise.all([
          fetch("/api/products"),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-white text-[#1B3F5F]">
      {/* Hero */}
      <section className="bg-[#eaf3f7] py-16 px-4 text-center">
        <div>
          <Image
            src="/logo.png"
            alt="Sarveswary Logo"
            width={200}
            height={80}
            className="mx-auto mb-4"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0b3954]">
          Don’t worry with Sarveswary
        </h1>
        <p className="mt-4 text-lg text-[#3182a8]">
          Veterinary pharmaceutical solutions for a healthier tomorrow.
        </p>
        <Link href="/products">
          <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow">
            Explore Products
          </button>
        </Link>
      </section>

      {/* Why Sarveswary */}
      <section className="py-14 px-4 sm:px-6 bg-white text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-10">Why Sarveswary?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">💊</div>
            <p>Trusted Veterinary Products</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">⚡</div>
            <p>Fast & Reliable Delivery</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">🏥</div>
            <p>WHO-GMP Certified</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9FAFB]">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <FeaturedProductsSlider products={products} />
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 bg-[#E6F2F6] text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Need help?</h2>
        <p className="mb-6 text-[#4CA1B6] text-base sm:text-lg">
          Reach out to our support or drop us a message.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#FFD700] text-[#1B3F5F] font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}
