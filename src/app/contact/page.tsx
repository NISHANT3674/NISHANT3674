"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="text-[#1B3F5F]">
      {/* Hero Section */}
      <div
        className="bg-center bg-no-repeat bg-cover md:bg-contain  bg-[#000000] text-white text-center py-32 mt-2"
        style={{
          backgroundImage: "url('/dark-logo.webp')",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">CONTACT US</h1>
        <p className="max-w-xl mx-auto text-lg">
          Need an expert? You are more than welcome to leave your contact info
          and we will be in touch shortly.
        </p>
      </div>

      {/* Info Section */}
      <section className="bg-white py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {/* Visit Us */}
          <div>
            <FaMapMarkerAlt className="text-4xl mx-auto text-[#0b3c5a]" />
            <h3 className="text-xl font-bold mb-2">VISIT US</h3>
            <p className="text-sm text-gray-600">
              Visit our office and we’ll happily help you out with anything.
            </p>
            <p className="font-semibold text-[#0b3c5a]">
              2nd Floor, Sarveswary Complex,
              <br />
              Zanzarda Rd,Junagadh,
              <br />
              Gujarat,India. 362001
            </p>
          </div>

          {/* Call Us */}
          <div>
            <FaPhoneAlt className="text-4xl mx-auto text-[#0b3c5a]" />
            <h3 className="text-xl font-bold mb-2">CALL US</h3>
            <p className="text-sm text-gray-600">
              We’re available by phone Monday to Saturday, 10AM–6PM.
            </p>
            <p className="font-semibold text-[#0b3c5a]">+91 98252 87459</p>
          </div>

          {/* Contact Us */}
          <div>
            <FaEnvelope className="text-4xl mx-auto text-[#0b3c5a]" />
            <h3 className="text-xl font-bold mb-2">CONTACT US</h3>
            <p className="text-sm text-gray-600">
              Feel free to email us your queries or concerns.
            </p>
            <p className="mt-2 font-semibold text-[#0b3c5a]">
              sarveswary.pharma@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
