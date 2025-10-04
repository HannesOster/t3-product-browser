import type { RouterOutputs } from "~/trpc/react";
import { ProductCard } from "./product-card";
import { Skeleton } from "./ui/skeleton";

type ProductGridProps = {
  isLoading: boolean;
  products: RouterOutputs["products"]["getList"]["items"];
};

export function ProductGrid({ isLoading, products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {isLoading && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-[344px] w-full" />
          ))}
        </>
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
  );
}
