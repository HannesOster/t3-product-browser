import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { api } from "~/trpc/react";
import { BestsellerSwitch } from "./bestseller-switch";

export interface AdminProductTableProps {
  items: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    bestseller: boolean;
  }>;
  isLoading: boolean;
  refetch: () => void;
}

export function AdminProductTable({
  items,
  isLoading,
  refetch,
}: AdminProductTableProps) {
  const deleteProduct = api.products.delete.useMutation({
    onSuccess: () => refetch(),
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Category</TableHead>
          <TableHead className="hidden sm:table-cell">Price</TableHead>
          <TableHead>Bestseller</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 13 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-20" />
                </TableCell>
              </TableRow>
            ))
          : items.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {product.category}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {product.price}
                </TableCell>
                <TableCell>
                  <BestsellerSwitch
                    initialChecked={product.bestseller}
                    productId={product.id}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => deleteProduct.mutate(product.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
