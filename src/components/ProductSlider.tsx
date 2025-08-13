// components/ProductSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    title: "PERFORMANCE",
    subtitle: "INNERWEAR",
    description: "Designed for every rep",
    image: "/products/innerwear.png",
  },
  {
    id: "2",
    title: "PANTS",
    subtitle: "ON POINT",
    description: "Comfort you can count on",
    image: "/products/pants.png",
  },
  {
    id: "3",
    title: "BIG TEE",
    subtitle: "ENERGY",
    description: "Oversized Fit Done Right",
    image: "/products/tshirt.png",
  },
];

export default function ProductSlider() {
  return (
    <div className="w-full py-8">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides
        navigation
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-2xl p-6 shadow-md relative flex flex-col items-center text-center">
              <div className="w-full h-56 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-bold mt-4">{product.title}</h2>
              <h3 className="text-2xl font-extrabold">{product.subtitle}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <button className="mt-4 px-5 py-2 border border-gray-700 rounded-md hover:bg-gray-100">
                EXPLORE NOW
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
