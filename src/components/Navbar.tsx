"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaBoxOpen, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center">
            <Image
              src="/just-logo.png"
              alt="Sarveswary Logo"
              width={40}
              height={40}
              className="mx-auto bg-transparent"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
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

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#0b3c5a] focus:outline-none"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with slide-down animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 flex flex-col space-y-4 bg-white">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
            onClick={() => setIsOpen(false)}
          >
            <FaBoxOpen /> Products
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-[#0b3c5a] hover:text-[#6cb5cb]"
            onClick={() => setIsOpen(false)}
          >
            <FaEnvelope /> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
