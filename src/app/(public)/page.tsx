"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useGetAllProducts } from "@/hooks/useCreateProduct";
import ProductCard from "@/components/shared/ProductCard";
import { IProduct } from "@/types/product";
import ProductList from "@/components/shared/ProductList";



export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

 const minPrice = sortBy === "low" ? 0 : undefined;
  const maxPrice = sortBy === "high" ? 999999 : undefined;

   const { data: products = [], isLoading } =
    useGetAllProducts(search, minPrice, maxPrice);

  return (
     <div className="p-10">
       {/* SEARCH + SORT BAR */}

        <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Get Inspired
        </h1>

        <p className="text-gray-600 max-w-2xl mt-4 leading-relaxed">
          Browsing for your next long-haul trip, everyday journey, or just fancy 
          a look at what s new? Explore our most popular and latest arrivals.
        </p>
      </section>


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

      {isLoading && <p>Loading...</p>}

      <section className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 pb-12">
        <ProductList products={products}/>
      </section>

     
    </div>
  );
}
