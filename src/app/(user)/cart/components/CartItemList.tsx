"use client";

import CartItem from "./CartItem";
import { ICart } from "@/types/cart";

type CartItemListProps = {
  cart: ICart;
};

export default function CartItemList({ cart }: CartItemListProps) {
  return (
    <div className="flex flex-col gap-8 px-4 lg:px-10">
      {cart.items.map((item) => (
        <CartItem
          key={item._id}
          image={item.productId.images?.[0] ?? "/placeholder.png"}
          title={item.productId.name}
          price={item.productId.price}
          quantity={item.quantity}
          onIncrease={() => console.log("increase", item.productId._id)}
          onDecrease={() => console.log("decrease", item.productId._id)}
          onRemove={() => console.log("remove", item.productId._id)}
        />
      ))}
    </div>
  );
}
