"use client";

import { useCart } from "@/hooks/useCart";
import CartItemList from "./components/CartItemList";

export default function CartPage() {
  const { data: cart, isLoading, error } = useCart();

  if (isLoading) {
    return <div className="p-10 text-lg font-semibold">Loading cart...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">Failed to load cart.</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="p-10 text-gray-600 text-lg">Your cart is empty.</div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-6 sm:py-8 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 pb-12 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Your Cart</h1>
        <CartItemList cart={cart} />
      </section>
    </div>
  );
}
