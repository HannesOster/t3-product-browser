"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { ProductGrid } from "~/components/produc-grid";

export default function CategoryByIdPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const { data, isLoading } = api.products.getList.useQuery({
    category: categoryId,
  });
  const products = data?.items ?? [];
  return (
    <div className="px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Produkt Kategorie: {products[0]?.category}
      </h1>
      <ProductGrid products={products} isLoading={isLoading} />
    </div>
  );
}
