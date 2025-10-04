"use client";
import { useState } from "react";
import { CartButton } from "./cart-button";
import { CartDrawer } from "./cart-drawer";
import AuthButton from "./auth-button";
import MainNav from "./main-nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow">
      <div className="flex items-center gap-8">
        <h1 className="hidden text-xl font-bold sm:block">Product Browser</h1>
        <MainNav />
      </div>
      <div className="grid grid-flow-col items-center gap-5">
        <AuthButton />
        <CartButton onClick={() => setOpen(true)} />
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
