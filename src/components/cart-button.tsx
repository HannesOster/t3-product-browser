"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "~/lib/cart-store";

export function CartButton({ onClick }: { onClick: () => void }) {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="relative rounded-full p-2"
    >
      <ShoppingCart />
      {count > 0 && (
        <span className="bg-primary absolute -top-2 -right-2 rounded-full px-2 text-xs text-white">
          {count}
        </span>
      )}
    </Button>
  );
}
