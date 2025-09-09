import { create } from "zustand";
import type { Product } from "./products";

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

export const useCart = create<CartState>(
  (
    set: (fn: (state: CartState) => Partial<CartState> | CartState) => void,
  ) => ({
    items: [],
    add: (product: Product, qty: number = product.quantityIncrement): void =>
      set((state: CartState): Partial<CartState> => {
        const existing = state.items.find((i) => i.product.id === product.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + qty }
                : i,
            ),
          };
        }
        return { items: [...state.items, { product, quantity: qty }] };
      }),
    remove: (id: string): void =>
      set(
        (state: CartState): Partial<CartState> => ({
          items: state.items.filter((i) => i.product.id !== id),
        }),
      ),
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
      set(
        (): Partial<CartState> => ({
          items: [],
        }),
      ),
  }),
);
