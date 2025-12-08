"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiShoppingCart,
  FiHome,
  FiTag,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut
} from "react-icons/fi";



export default function Sidebar({
  collapsed,
  setCollapsed
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Products", href: "/dashboard", icon: <FiHome /> },
    { name: "Add Products", href: "/dashboard/addproducts", icon: <FiBox /> },
    { name: "Users", href: "/users", icon: <FiTag /> },
    { name: "Orders", href: "/orders", icon: <FiShoppingCart /> },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-[#1a1d1f] text-gray-200 
        border-r border-gray-700 flex flex-col justify-between
        transition-all duration-300 z-50
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div>
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

        <nav className="flex flex-col gap-1 mt-4 p-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 text-sm rounded-md font-medium
                  transition-all
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

      <div className="p-2 mb-4">
        <button className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium text-gray-300 hover:bg-red-700/80 hover:text-white">
          <FiLogOut className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
