"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-gray-300 pt-16">

      {/* TOP GRADIENT LINE */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-semibold text-white mb-5">MyStore</h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting premium essentials with timeless design and exceptional durability.
          </p>

          <div className="flex gap-5 mt-7">
            <FaFacebookF className="text-gray-400 hover:text-white transition cursor-pointer" size={16} />
            <FaInstagram className="text-gray-400 hover:text-white transition cursor-pointer" size={16} />
            <FaTwitter className="text-gray-400 hover:text-white transition cursor-pointer" size={16} />
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-lg text-white font-medium mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white text-gray-400 transition">All Products</Link></li>
            <li><Link href="/collections" className="hover:text-white text-gray-400 transition">Collections</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-white text-gray-400 transition">New Arrivals</Link></li>
            <li><Link href="/best-sellers" className="hover:text-white text-gray-400 transition">Best Sellers</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg text-white font-medium mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-white text-gray-400 transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white text-gray-400 transition">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white text-gray-400 transition">Shipping Info</Link></li>
            <li><Link href="/returns" className="hover:text-white text-gray-400 transition">Returns</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg text-white font-medium mb-4">Stay in the Loop</h3>
          <p className="text-sm text-gray-400 mb-4">Exclusive deals, early access & new drops.</p>

          <div className="flex items-center bg-[#1a1a1a] rounded-full shadow-inner overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-300 placeholder-gray-500 outline-none"
            />
            <button className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="px-5 sm:px-8 lg:px-10 py-6 border-t border-white/10 
                      text-center text-[13px] text-gray-500">
        © {new Date().getFullYear()} MyStore — All Rights Reserved.
      </div>
    </footer>
  );
}
