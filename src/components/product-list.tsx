"use client";
import { ProductCard } from "./product-card";
import { ProductFilterBar } from "./product-filter-bar";
import useQueryFilter from "~/lib/use-query-filter";
import { api } from "~/trpc/react";
import { PaginationControls } from "./pagination-controls";
import { Skeleton } from "./ui/skeleton";
import { ProductGrid } from "./produc-grid";

export function ProductList() {
  const [filters] = useQueryFilter();

  const { search, category, sort, page } = filters;
  const { data, isLoading } = api.products.getList.useQuery({
    search,
    category: category === "Keine Kategorie" ? undefined : category,
    sort: sort === "price-asc" || sort === "price-desc" ? sort : undefined,
    page,
    pageSize: 12,
  });

  const products = data?.items ?? [];

  return (
    <>
      <div className="flex min-h-screen w-full max-w-6xl flex-col">
        <ProductFilterBar />
        <ProductGrid isLoading={isLoading} products={products} />
      </div>
      <PaginationControls
        page={page}
        isLoading={isLoading}
        totalPages={data?.pageCount}
      />
    </>
  );
}
