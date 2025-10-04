"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CategorySelect } from "../category-select";
import { api } from "~/trpc/react";
import type { Product } from "@prisma/client";

export function AdminProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });
  const createProduct = api.products.create.useMutation();

  const handleCreate = (product: Product) => {
    createProduct.mutate({
      category: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: "",
      quantityIncrement: 1,
      bestseller: false,
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate({
          name: form.name,
          description: form.description,
          price: form.price,
          categoryId: form.categoryId,
          id: "",
          imageUrl: "",
          quantityIncrement: 1,
          bestseller: false,
        });
        setForm({ name: "", description: "", price: 0, categoryId: "" });
      }}
      className="mb-6 flex flex-col gap-2"
    >
      <Input
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Name"
        required
      />
      <Input
        value={form.description}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
        placeholder="Description"
        required
      />
      <Input
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm((f) => ({ ...f, price: Number(e.target.value) }))
        }
        placeholder="Price"
        required
      />
      <CategorySelect
        value={form.categoryId}
        setValue={(v) => setForm((f) => ({ ...f, categoryId: v }))}
      />
      <Button type="submit">Add Product</Button>
    </form>
  );
}
