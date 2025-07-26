"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className=" bg-white sticky border-transparent top-0 z-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center  justify-center">
            <Image
              src="/just-logo.png"
              alt="Sarveswary Logo"
              width={40}
              height={40}
              className="mx-auto bg-transparent"
              priority
            />
            {/* <span className="font-bold text-[#1B3F5F] text-lg">Sarveswary</span> */}
          </div>
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden sm:block">
          <Link
            href="/"
            className="text-gray-700 hover:text-[#1B3F5F] font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-[#1B3F5F] font-medium"
          >
            Products
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 hover:text-[#1B3F5F] font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
