"use client";

import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

type CartItemProps = {
  image: string;
  title: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  image,
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div
      className="
        flex flex-col sm:flex-row 
        bg-white rounded-xl border border-gray-200 
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-full sm:w-40 md:w-44
          aspect-square
          bg-gray-100 
          flex-shrink-0 
          relative
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          flex flex-col sm:flex-row 
          items-center 
          justify-between 
          flex-1 
          p-4 sm:p-6
        "
      >
        {/* TEXT */}
        <div
          className="
            flex flex-col 
            items-center sm:items-start 
            text-center sm:text-left 
            flex-1
          "
        >
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-blue-600 font-bold text-lg mt-1">
            ${price.toFixed(2)}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={onDecrease}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg"
          >
            –
          </button>

          <span className="text-lg sm:text-xl font-semibold">{quantity}</span>

          <button
            onClick={onIncrease}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg"
          >
            +
          </button>

          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <FiTrash2 size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
