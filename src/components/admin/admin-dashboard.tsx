"use client";
import { ProductFilterBar } from "~/components/product-filter-bar";
import { PaginationControls } from "~/components/pagination-controls";
import { api } from "~/trpc/react";
import useQueryFilter from "~/lib/use-query-filter";
import { AdminProductTable } from "./admin-product-table";
import { AdminProductForm } from "./admin-product-form";
import { Suspense } from "react";

export default function AdminDashboard() {
  const [filters] = useQueryFilter();

  const { search, category, sort, page } = filters;

  const { data, refetch, isLoading, isFetching } =
    api.products.getList.useQuery({
      search,
      category: category === "Keine Kategorie" ? undefined : category,
      sort: sort === "price-asc" || sort === "price-desc" ? sort : undefined,
      page,
      pageSize: 12,
    });
  const deleteProduct = api.products.delete.useMutation({
    onSuccess: () => refetch(),
  });
  const createProduct = api.products.create.useMutation({
    onSuccess: () => refetch(),
  });

  const { data: categories } = api.products.getCategories.useQuery();

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin-Bereich</h1>
        <span className="bg-primary text-primary-foreground rounded px-3 py-1 text-sm shadow">
          Produkte verwalten
        </span>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Neues Produkt anlegen</h2>
          <AdminProductForm
            categories={categories}
            onCreate={(form) => {
              createProduct.mutate({
                name: form.name,
                description: form.description,
                price: form.price,
                category: form.categoryId,
                imageUrl: `https://picsum.photos/400/240?random=${Math.random()}`,
                quantityIncrement: 1,
              });
            }}
          />
        </div>
        <div className="bg-card rounded-lg border p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Filter & Suche</h2>
          <ProductFilterBar admin />
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Produktliste</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminProductTable
            isLoading={isLoading || isFetching}
            items={data?.items ?? []}
            onDelete={(id) => deleteProduct.mutate(id)}
          />
        </Suspense>
        <div className="mt-6 flex justify-center">
          <PaginationControls
            page={filters.page}
            totalPages={data?.pageCount}
            isLoading={isLoading || isFetching}
          />
        </div>
      </div>
    </div>
  );
}
