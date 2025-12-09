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
    <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      {/* IMAGE BLOCK TOUCHING LEFT EDGE */}
      <div className="w-44 h-44 bg-gray-100 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SECTION WITH PADDING */}
      <div className="flex items-center justify-between flex-1 p-6 pl-8">

        {/* CENTERED TEXT */}
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-blue-600 font-semibold text-lg mt-1">
            ${price.toFixed(2)}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            onClick={onDecrease}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xl"
          >
            –
          </button>

          <span className="text-xl font-semibold">{quantity}</span>

          <button
            onClick={onIncrease}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xl"
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
