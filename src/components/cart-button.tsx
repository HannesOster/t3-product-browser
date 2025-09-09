"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "~/lib/cart-store";

export function CartButton({ onClick }: { onClick: () => void }) {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  return (
    <button type="button" onClick={onClick} className="relative cursor-pointer">
      <ShoppingCart />
      {count > 0 && (
        <span className="bg-primary absolute -top-2 -right-2 rounded-full px-2 text-xs text-white">
          {count}
        </span>
      )}
    </button>
  );
}
