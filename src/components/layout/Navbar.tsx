"use client";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/logout";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 backdrop-blur-md text-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
          {/* LEFT LOGO */}
          <div className="flex items-center gap-3">
            <FiShoppingCart size={22} className="text-gray-700" />
            <Link href="/" className="text-3xl font-semibold tracking-tight">
              MyStore
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/" className="nav-link hover:text-black transition">
              Home
            </Link>
            <Link href="#" className="nav-link hover:text-black transition">
              Collections
            </Link>
            <Link href="#" className="nav-link hover:text-black transition">
              Explore
            </Link>
          </div>

          {/* DESKTOP CART + LOGIN */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/cart" className="flex items-center gap-2 hover:text-black transition">
              <FiShoppingCart size={20} />
              <span className="text-base font-semibold">Cart (0)</span>
            </Link>

            {user ? (
              <button className="text-base font-semibold hover:text-black transition"
              onClick={logout}>
                Logout
              </button>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-black transition">
                <FaUser size={18} />
                <span className="text-base font-semibold">Login</span>
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-gray-900" onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>
      </nav>

      {/* ============= MOBILE SIDE DRAWER ============= */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#3030329f] text-white p-6 z-[60] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex justify-between">
              <p className="text-xl font-semibold">MyStore</p>
            <button
          className="absolute right-5 top-5 text-white hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <IoMdClose size={28} />
        </button>
        </div>
        <button
          className="absolute right-5 top-5 text-white hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <IoMdClose size={28} />
        </button>

        {/* USER SECTION */}
        {/* {user && (
          <div className="mt-14 pb-6 border-b border-gray-600">
            <p className="text-xl font-semibold">MyStore</p>
            <p className="text-sm opacity-80">{user.email}</p>
          </div>
        )} */}

        {/* NAVIGATION LINKS */}
        <ul className="mt-10 space-y-6 text-lg font-medium">
          <li>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-300 transition"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/collections"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-300 transition"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-300 transition"
            >
              Explore
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <FiShoppingCart size={20} />
            <Link href="/cart" onClick={() => setOpen(false)} className="hover:text-gray-300 transition">
              Cart (0)
            </Link>
          </li>
        </ul>

        {/* LOGIN / LOGOUT */}
        <div className="mt-10">
          {user ? (
            <button
              onClick={logout}
              className="text-lg font-semibold w-full text-left hover:text-gray-300 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaUser size={18} /> Login
            </Link>
          )}
        </div>
      </div>

      {/* BACKDROP - Click to close */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}