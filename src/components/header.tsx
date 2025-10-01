"use client";
import { useState } from "react";
import { CartButton } from "./cart-button";
import { CartDrawer } from "./cart-drawer";
import AuthButton from "./auth-button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
      <h1 className="text-xl font-bold">Product Browser</h1>
      <div className="grid grid-flow-col items-center gap-5">
        {user?.publicMetadata.role === "admin" && (
          <Link
            href="/admin"
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            Admin
          </Link>
        )}
        <AuthButton />
        <CartButton onClick={() => setOpen(true)} />
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
