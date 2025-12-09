"use client";

import { useProductById } from "@/hooks/useCreateProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function ProductDetails() {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useProductById(productId as string);

  const images: string[] = product?.images || [];

  const defaultImage = useMemo(() => {
    return images.length > 0 ? images[0] : "";
  }, [images]);

  const [activeImg, setActiveImg] = useState("");

  const displayedImg = activeImg || defaultImage;

  if (isLoading) {
    return <div className="p-10 text-lg font-semibold">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="p-10 text-red-600">Failed to load product.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:gap-10 px-6 lg:px-20 py-6 lg:mt-10">
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        <div className="w-full max-w-xl h-64 sm:h-80 md:h-[430px] relative">
          {displayedImg && (
            <Image
              src={displayedImg}
              alt={product.productName}
              fill
              className="object-contain"
            />
          )}
        </div>

        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(img)}
              className={`w-20 h-20 cursor-pointer rounded border ${
                displayedImg === img ? "border-blue-600" : "border-gray-200"
              } relative shrink-0`}
            >
              <Image src={img} alt="thumb" fill unoptimized className="object-cover rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
        <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
        <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
        <p className="text-3xl font-semibold mt-2 mb-4">₹ {product.price}</p>

        <button className="w-full lg:w-72 py-2 bg-black/70 hover:bg-black text-white rounded-xl font-semibold text-lg">
          Add to Cart
        </button>
      </div>

    </div>
  );
}
