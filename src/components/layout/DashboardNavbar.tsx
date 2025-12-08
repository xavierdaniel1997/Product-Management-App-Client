"use client";

import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { logout } from "@/lib/logout";

export default function DashboardNavbar({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Dashboard";
    const last = parts.pop()!;
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-gray-100 z-40
        flex items-center justify-between px-6 transition-all duration-300
        ${collapsed ? "md:ml-20 md:w-[calc(100%-5rem)]" : "md:ml-64 md:w-[calc(100%-16rem)]"}
        w-full
      `}
    >
      <h1 className="text-lg font-semibold">{getPageTitle()}</h1>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-black text-white p-2 rounded-md"
      >
        <FiLogOut />
      </button>
    </header>
  );
}
