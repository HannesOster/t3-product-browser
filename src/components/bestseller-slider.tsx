"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import type { Product } from "@prisma/client";
import { api } from "~/trpc/react";
import { Spinner } from "./ui/shadcn-io/spinner";

export function BestsellerSlider() {
  const { data, isLoading } = api.products.getBestsellers.useQuery();
  if (isLoading) {
    return <Spinner />;
  }

  const products = data ?? [];
  return (
    <section className="z-10 w-full max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-center text-2xl font-bold">Unsere Bestseller</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product: Product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={140}
                className="mb-2 h-32 w-full rounded object-cover"
              />
              <div className="mb-1 text-center text-lg font-semibold">
                {product.name}
              </div>
              <div className="text-primary mb-2 text-center font-bold">
                {product.price.toFixed(2)} €
              </div>
              <Button size="sm" asChild>
                <Link href={`/products/${product.id}`}>Zum Produkt</Link>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
