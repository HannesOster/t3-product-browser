"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import Image from "next/image";
import { useCart } from "~/lib/cart-store";
import { ChevronLeft } from "lucide-react";
import { api, type RouterOutputs } from "~/trpc/react";
import { Spinner } from "~/components/ui/shadcn-io/spinner";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: product,
    isLoading,
    error,
  } = api.products.getById.useQuery(id ?? "");
  const add = useCart(
    (s: { add: (product: RouterOutputs["products"]["getById"]) => void }) =>
      s.add,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!product || error) {
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

      <Card className="mt-6">
        <CardContent className="flex flex-col gap-4">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            width={400}
            height={240}
            className="h-60 w-full rounded object-cover"
          />
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {product.category}
          </CardDescription>
          <div className="text-xl font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mt-4 w-full" onClick={() => add(product)}>
            In den Warenkorb
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
