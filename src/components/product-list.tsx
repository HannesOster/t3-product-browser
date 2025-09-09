"use client";
import { products } from "~/lib/products";
import { ProductCard } from "./product-card";
import { ProductFilterBar } from "./product-filter-bar";
import useQueryFilter from "~/lib/use-query-filter";

export function ProductList() {
  const [filters] = useQueryFilter();

  const { search, category, sort } = filters;

  let filtered = products ?? [];
  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
  if (category && category !== "Keine Kategorie") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (sort === "price-asc") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex min-h-screen w-full max-w-6xl flex-col">
      <ProductFilterBar />
      <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && (
          <div className="text-muted-foreground col-span-full py-12 text-center">
            Keine Produkte gefunden.
          </div>
        )}
      </div>
    </div>
  );
}
