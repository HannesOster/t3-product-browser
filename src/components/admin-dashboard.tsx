"use client";
import { ProductFilterBar } from "~/components/product-filter-bar";
import { PaginationControls } from "~/components/pagination-controls";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useState } from "react";
import useQueryFilter from "~/lib/use-query-filter";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "~/components/ui/table";
import type { Category } from "@prisma/client";

export default function AdminDashboard() {
  const [filters] = useQueryFilter();

  const { search, category, sort, page } = filters;

  const { data, refetch } = api.products.getList.useQuery({
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

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  // Load categories for select
  const { data: categories } = api.products.getCategories.useQuery();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Admin: Products</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProduct.mutate({
            name: form.name,
            description: form.description,
            price: form.price,
            category: form.categoryId,
            imageUrl: `https://picsum.photos/400/240?random=${Math.random()}`,
            quantityIncrement: 1,
          });
          setForm({ name: "", description: "", price: 0, categoryId: "" });
        }}
        className="mb-6 flex gap-2"
      >
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Name"
          required
        />
        <input
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: Number(e.target.value) }))
          }
          placeholder="Price"
          required
        />
        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm((f) => ({ ...f, categoryId: e.target.value }))
          }
          required
        >
          <option value="" disabled>
            Kategorie wählen
          </option>
          {categories?.categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <Button type="submit">Add Product</Button>
      </form>
      <ProductFilterBar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteProduct.mutate(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls page={filters.page} totalPages={data?.pageCount} />
    </div>
  );
}
