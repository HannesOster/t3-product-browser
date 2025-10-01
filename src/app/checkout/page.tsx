"use client";
import { useCart } from "~/lib/cart-store";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { CartItems } from "~/components/cart-items";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      {items.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          Your cart is empty.
          <div className="mt-4">
            <Link href="/products">
              <Button variant="outline">Back to Products</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <CartItems
            hideActions
            onClose={() => {
              /* */
            }}
          />
          <div className="flex items-center justify-between px-4 py-2 text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="mt-4 w-full" onClick={clear} variant="default">
            Place Order
          </Button>
        </>
      )}
    </div>
  );
}
