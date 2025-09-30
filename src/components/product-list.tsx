"use client";
import { ProductCard } from "./product-card";
import { ProductFilterBar } from "./product-filter-bar";
import useQueryFilter from "~/lib/use-query-filter";
import { api } from "~/trpc/react";

export function ProductList() {
  const [filters] = useQueryFilter();

  const { search, category, sort } = filters;

  //  products: RouterOutputs["products"]["list"]["items"];

  const { data, isLoading } = api.products.getList.useQuery({
    search,
    category: category === "Keine Kategorie" ? undefined : category,
    sort: sort === "price-asc" || sort === "price-desc" ? sort : undefined,
    page: 1,
    pageSize: 12,
  });

  const products = data?.items ?? [];

  return (
    <div className="flex min-h-screen w-full max-w-6xl flex-col">
      <ProductFilterBar />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading && (
          <div className="text-muted-foreground col-span-full py-12 text-center">
            Lade Produkte...
          </div>
        )}
        {!isLoading &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        {!isLoading && products.length === 0 && (
          <div className="text-muted-foreground col-span-full py-12 text-center">
            Keine Produkte gefunden.
          </div>
        )}
      </div>
    </div>
  );
}
