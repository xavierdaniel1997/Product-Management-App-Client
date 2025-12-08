"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiSettings,
  FiPlus,
} from "react-icons/fi";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
    { name: "Products", href: "/products", icon: <FiBox /> },
    { name: "Cart", href: "/cart", icon: <FiShoppingCart /> },
    { name: "Settings", href: "/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] 
      bg-[#1a1d1f] text-gray-300 shadow-xl rounded-3xl 
      p-3 flex items-center justify-between border border-gray-700">
      
      {navItems.slice(0, 2).map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            <span className={`text-xl ${active ? "text-blue-500" : "text-gray-400"}`}>
              {item.icon}
            </span>
            <span className={`${active ? "text-blue-500" : "text-gray-400"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}

      {/* CENTER ACTION BUTTON */}
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg text-2xl">
          <FiPlus />
        </button>
      </div>

      {navItems.slice(2).map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            <span className={`text-xl ${active ? "text-blue-500" : "text-gray-400"}`}>
              {item.icon}
            </span>
            <span className={`${active ? "text-blue-500" : "text-gray-400"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
