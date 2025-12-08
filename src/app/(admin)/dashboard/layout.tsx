"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN SECTION */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "ml-16" : "ml-64"}   /* ADJUST MAIN AREA */
        `}
      >
        
        {/* NAVBAR */}
        <DashboardNavbar collapsed={collapsed} />

        {/* PAGE CONTENT */}
        <main className="pt-24 p-10">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav />
    </div>
  );
}
