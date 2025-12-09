"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  productId: string;
};

export default function ProductCard({
  image,
  title,
  price,
  productId,
}: ProductCardProps) {
  
  const router = useRouter();

  

  return (
    <div
      className="w-full rounded-xl cursor-pointer"
      onClick={() => router.push(`/product/${productId}`)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-gray-200 rounded-lg p-4 h-56"
      >
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-contain"
        />
      </motion.div>

      <div className="mt-4 px-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm font-semibold mt-2">₹ {price}</p>
      </div>
    </div>
  );
}
