"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./sliderStyles.css";

type Product = {
  _id: string;
  name: string;
  category?: string;
  imageUrl?: string;
};

type Props = {
  products: Product[];
};

export default function FeaturedProductsSlider({ products }: Props) {
  const colors = [
    "#FDF6EC", // peach
    "#EAF4F4", // mint
    "#FFF8E7", // cream
    "#F0EBF8", // lavender
    "#E7F0FD", // blue
    "#FDECEF", // blush
  ];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="swiper-button-prev custom-nav left-[-50px]"></div>
      <div className="swiper-button-next custom-nav right-[-50px]"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: false },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="featured-slider"
      >
        {products.map((p, index) => (
          <SwiperSlide key={p._id}>
            <Link href={`/products/${p._id}`}>
              <div
                className="rounded-2xl shadow-lg p-4 flex flex-col items-center"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              >
                {p.imageUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      src={`/products/${p.imageUrl}.png`}
                      alt={p.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                )}
                <h3 className="mt-4 font-semibold text-center">{p.name}</h3>
                <p className="text-sm text-gray-600 text-center">
                  {p.category}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="custom-pagination mt-6 flex justify-center"></div>
    </div>
  );
}
