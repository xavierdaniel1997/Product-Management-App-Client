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
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => router.push(`/product/${productId}`)}
      className="w-full cursor-pointer"
    >
  
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 ease-out hover:scale-110"
        />
      </div>


      <div className="mt-3">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-sm font-bold mt-1">₹ {price}</p>
      </div>
    </motion.div>
  );
}
