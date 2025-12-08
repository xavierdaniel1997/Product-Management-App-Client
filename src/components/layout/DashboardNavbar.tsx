"use client";

import { logout } from "@/lib/logout";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function DashboardNavbar() {
  const pathname = usePathname();

  // Convert pathname → readable title
  const getPageTitle = () => {
    const title = pathname.split("/")[1] || "Dashboard";
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 text-gray-600">
      {/* ACTIVE ROUTE NAME */}
      <h1 className="text-lg font-semibold tracking-wide">{getPageTitle()}</h1>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="
          flex items-center gap-2 
          bg-black
          text-white p-2 rounded-md 
          transition-all
        "
      >
        <FiLogOut />
      </button>
    </header>
  );
}
