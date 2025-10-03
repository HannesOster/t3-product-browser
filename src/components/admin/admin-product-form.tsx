import { useState } from "react";
import { Input } from "../ui/input";
import type { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { CategorySelect } from "../category-select";

export interface AdminProductFormProps {
  onCreate: (product: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }) => void;
  categories: { categories: Category[] } | undefined;
}

export function AdminProductForm({ onCreate }: AdminProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate({
          name: form.name,
          description: form.description,
          price: form.price,
          categoryId: form.categoryId,
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
