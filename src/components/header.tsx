"use client";
import { useState } from "react";
import { CartButton } from "./cart-button";
import { CartDrawer } from "./cart-drawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
      <h1 className="text-xl font-bold">Product Browser</h1>
      <CartButton onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
