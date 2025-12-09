"use client";

import { useProductById } from "@/hooks/useCreateProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useAddToCart } from "@/hooks/useCart";

export default function ProductDetails() {
   const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  const { data: product, isLoading, error } = useProductById(productId as string);
    const addToCart = useAddToCart();

  const handleIncrease = useCallback(() => {
    if (!product) return;
    setQuantity((q) => Math.min(product.stock, q + 1));
  }, [product]);

  const handleDecrease = useCallback(() => {
    setQuantity((q) => Math.max(1, q - 1));
  }, []);


  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart.mutate({
      productId: product._id,
      quantity,
    });
  }, [product, quantity, addToCart]);

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
      
      {/* LEFT SIDE - IMAGES */}
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        
        {/* MAIN IMAGE */}
        <motion.div
          key={displayedImg}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-2xl h-80 sm:h-[420px] md:h-[520px] lg:h-[600px] relative"
        >
          {displayedImg && (
            <Image
              src={displayedImg}
              alt={product.productName}
              fill
              className="object-contain"
            />
          )}
        </motion.div>

        {/* THUMBNAILS */}
        <div className="flex flex-wrap gap-4 mt-6 py-2 justify-center">
          {images.map((img, i) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={i}
              onClick={() => setActiveImg(img)}
              className={`w-24 h-24 sm:w-28 sm:h-28 cursor-pointer rounded-xl border 
                ${
                  displayedImg === img
                    ? "border-black shadow-lg"
                    : "border-gray-300"
                } 
                relative shrink-0 overflow-hidden`}
            >
              <Image
                src={img}
                alt="thumb"
                fill
                unoptimized
                className="object-cover rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>



      <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
        <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
        <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>

        <p className="text-3xl font-semibold mt-2 mb-4">₹ {product.price}</p>

        <p className="text-sm text-gray-500 mb-3">
          Stock Available: {product.stock}
        </p>

        {/* QUANTITY SELECTOR */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleDecrease}
            className="w-10 h-10 flex items-center justify-center border rounded-lg text-lg"
          >
            -
          </button>

          <span className="text-lg font-medium w-10 text-center">{quantity}</span>

          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stock}
            className="w-10 h-10 flex items-center justify-center border rounded-lg text-lg disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={addToCart.isPending || product.stock === 0}
          className="w-full lg:w-72 py-2 bg-black/80 hover:bg-black text-white rounded-xl font-semibold text-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {product.stock === 0
            ? "Out of Stock"
            : addToCart.isPending
            ? "Adding..."
            : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}
