"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      {/* <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> */}
      <div className="hidden lg:block">
  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
</div>

      {/* MAIN SECTION */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "lg:ml-16" : "lg:ml-64"} ml-0
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
