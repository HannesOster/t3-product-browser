"use client";
import { products } from "~/lib/products";
import { ProductCard } from "./product-card";
import { ProductFilterBar } from "./product-filter-bar";
import useQueryFilter from "~/lib/use-query-filter";
import { useMemo } from "react";

export function ProductList() {
  const [filters] = useQueryFilter();

  const { search, category, sort } = filters;

  const filtered = useMemo(() => {
    let result = products ?? [];
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category && category !== "Keine Kategorie") {
      result = result.filter((p) => p.category === category);
    }
    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, search, category, sort]);

  return (
    <div className="flex min-h-screen w-full max-w-6xl flex-col">
      <ProductFilterBar />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
