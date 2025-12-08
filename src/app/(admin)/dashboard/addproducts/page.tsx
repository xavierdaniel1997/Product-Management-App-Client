"use client";

import { useState } from "react";
import ImageUploader from "../../../../components/forms/ImageUploader"

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Add New Product
      </h1>

      <form className="space-y-8">

        {/* PRODUCT DETAILS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>

          <div className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Product Name</label>
              <input
                type="text"
                placeholder="e.g. Premium Wireless Headphones"
                className="
                  mt-1 w-full rounded-md border border-gray-300 p-3 bg-gray-50 
                  focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200
                "
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Price</label>
              <div className="flex items-center gap-0 mt-1">
                <span className="px-4 py-3 bg-gray-100 rounded-l-md border border-gray-300 border-r-0">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="
                    w-full rounded-r-md border border-gray-300 p-3 bg-gray-50 
                    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200
                  "
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                rows={4}
                placeholder="Enter a detailed description of the product..."
                className="
                  mt-1 w-full rounded-md border border-gray-300 p-3 bg-gray-50 
                  focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200
                "
              />
            </div>
          </div>
        </div>

        {/* PRODUCT IMAGES */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Product Images</h2>

          <ImageUploader images={images} setImages={setImages} />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="
              w-1/2 py-3 rounded-lg border border-gray-300 
              text-gray-700 hover:bg-gray-100 transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              w-1/2 py-3 rounded-lg bg-black/70 text-white 
              hover:bg-black transition
            "
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
