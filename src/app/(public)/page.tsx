"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const products = [
  { name: "Shibuya Totepack", desc: "Recycled PET Rip-Stop", img: "/products/bag1.png", price: 2999 },
  { name: "SoFo Backpack City", desc: "Recycled Coated Cotton Canvas", img: "/products/bag2.png", price: 4999 },
  { name: "Gion Backpack Pro", desc: "Waterproof Tarpaulin", img: "/products/bag3.png", price: 6999 },
  { name: "SoFo Rolltop Backpack X", desc: "Recycled Coated Canvas", img: "/products/bag4.png", price: 3999 },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // FILTER + SORT
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER TEXT */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Get Inspired
        </h1>

        <p className="text-gray-600 max-w-2xl mt-4 leading-relaxed">
          Browsing for your next long-haul trip, everyday journey, or just fancy 
          a look at what s new? Explore our most popular and latest arrivals.
        </p>
      </section>

      {/* SEARCH + SORT BAR */}
      <section className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 pb-12">

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm w-full md:w-1/3 focus:outline-none focus:border-gray-400"
        />

        {/* SORT DROPDOWN */}
        <div className="relative">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm pr-8 appearance-none focus:outline-none focus:border-gray-400"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          <FaChevronDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">No products found.</p>
          )}

          {filteredProducts.map((p, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                <img src={p.img} alt={p.name} className="h-full object-cover" />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">₹{p.price}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
