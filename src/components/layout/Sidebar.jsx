"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiShoppingCart,
  FiHome,
  FiTag,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
    { name: "Products", href: "/products", icon: <FiBox /> },
    { name: "Categories", href: "/categories", icon: <FiTag /> },
    { name: "Orders", href: "/orders", icon: <FiShoppingCart /> },
  ];

  return (
    <div
      className={`h-screen bg-[#1a1d1f] text-gray-200 flex flex-col justify-between transition-all duration-300 border-r border-gray-700
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="text-xl" />
            {!collapsed && <h1 className="text-lg font-bold">MyStore</h1>}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white text-xl"
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-1 mt-4 p-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 text-sm font-medium 
                  rounded-md transition-all cursor-pointer
                  ${active ? "bg-blue-600 text-white" : "hover:bg-gray-800"}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT BUTTON */}
      <div className="p-2 mb-4">
        <button
          onClick={() => console.log("Logout clicked")}
          className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-md 
            text-gray-300 hover:bg-red-700/80 hover:text-white transition-all"
        >
          <FiLogOut className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
