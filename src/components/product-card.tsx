"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCart } from "~/lib/cart-store";
import type { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const add = useCart((s) => s.add as (product: Product) => void);

  return (
    <Card className="max-h-[344px]">
      <Link href={`/products/${product.id}`} tabIndex={-1}>
        <CardHeader className="p-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={160}
            className="h-40 w-full object-cover"
            priority
          />
        </CardHeader>
      </Link>
      <CardContent className="flex-1">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-base">{product.name}</CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          onClick={() => {
            add(product);
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
