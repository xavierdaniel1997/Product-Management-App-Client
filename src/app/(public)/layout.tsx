"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const hideFooterOn = ["/login", "/register"];

  const shouldHideFooter = hideFooterOn.includes(pathname);

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>

      {!shouldHideFooter && <Footer />}
    </>
  );
}
