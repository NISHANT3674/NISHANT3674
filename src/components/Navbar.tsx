"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHome, FaBoxOpen, FaEnvelope } from "react-icons/fa"; // icons

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
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
          >
            <FaBoxOpen /> Products
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
          >
            <FaEnvelope /> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
