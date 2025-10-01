import { create } from "zustand";
import type { Product } from "@prisma/client";
import { toast } from "sonner";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
};
export const useCart = create<CartState>((set) => ({
  items: [],
  add: (product: Product, qty: number = product.quantityIncrement): void =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
        toast("Item added to shopping cart.");
      } else {
        newItems = [...state.items, { product, quantity: qty }];
        toast("Item added to shopping cart.");
      }
      return { items: newItems, showPopup: true };
    }),
  remove: (id: string): void =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),
  update: (id: string, qty: number) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === id
          ? { ...i, quantity: Math.max(i.product.quantityIncrement, qty) }
          : i,
      ),
    }));
  },
  clear: (): void =>
    set(() => ({
      items: [],
    })),
}));
