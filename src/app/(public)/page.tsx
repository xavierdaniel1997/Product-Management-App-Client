"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState, useMemo } from "react";
import { useGetAllProducts } from "@/hooks/useCreateProduct";
import ProductList from "@/components/shared/ProductList";
import { IProduct } from "@/types/product";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: products = [], isLoading } = useGetAllProducts();


  const filteredProducts = useMemo(() => {
    let filtered = products;


    if (search.trim() !== "") {
      filtered = filtered.filter((p: IProduct) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (sortBy === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, sortBy]);

  return (
    <div className="">
      
      {/* TITLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Get Inspired
        </h1>
        <p className="text-gray-600 max-w-2xl mt-4 leading-relaxed">
          Browsing for your next long-haul trip, everyday journey, or just want to explore?
        </p>
      </section>

      {/* SEARCH + SORT BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3 sm:gap-4 pb-8 sm:pb-12">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm w-full md:w-1/3 focus:outline-none focus:border-gray-400"
        />

       
<div className="flex gap-3">
  <button
    onClick={() => setSortBy(sortBy === "low" ? "" : "low")}
    className={`px-4 py-2 rounded-full border text-sm ${
      sortBy === "low"
        ? "bg-black text-white border-black"
        : "bg-white text-gray-700 border-gray-300"
    }`}
  >
    Low → High
  </button>

  <button
    onClick={() => setSortBy(sortBy === "high" ? "" : "high")}
    className={`px-4 py-2 rounded-full border text-sm ${
      sortBy === "high"
        ? "bg-black text-white border-black"
        : "bg-white text-gray-700 border-gray-300"
    }`}
  >
    High → Low
  </button>
</div>

      </section>

      {isLoading && <p>Loading...</p>}

      {/* PRODUCT LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <ProductList products={filteredProducts} />
      </section>
    </div>
  );
}
