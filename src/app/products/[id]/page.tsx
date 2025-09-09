"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { products } from "~/lib/products";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { useCart } from "~/lib/cart-store";
import { ChevronLeft } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => p.id === id);
  const add = useCart(
    (s: { add: (product: (typeof products)[number]) => void }) => s.add,
  );

  if (!product) {
    const query = searchParams?.toString();
    router.replace(`/products${query ? `?${query}` : ""}`);
    return null;
  }

  return (
    <div className="mx-auto max-w-xl py-8">
      <Button
        className="cursor-pointer"
        variant="outline"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/products");
          }
        }}
      >
        <ChevronLeft />
        Zurück zur Liste
      </Button>
      <div className="bg-card mt-6 flex flex-col gap-4 rounded-lg p-6 shadow">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          width={400}
          height={240}
          className="h-60 w-full rounded object-cover"
        />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="text-muted-foreground">{product.category}</div>
        <div className="text-xl font-semibold">${product.price.toFixed(2)}</div>
        <Button
          className="mt-4 cursor-pointer"
          onClick={() => {
            add(product);
          }}
        >
          In den Warenkorb
        </Button>
      </div>
    </div>
  );
}
