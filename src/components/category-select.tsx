import type { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "~/trpc/react";

function CategorySelect({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  const { data, isLoading } = api.products.getCategories.useQuery();
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Kategorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"none"}>Keine Kategorie</SelectItem>
        {isLoading ? (
          <SelectItem value="loading">Lade...</SelectItem>
        ) : (
          data?.categories?.map((cat: Category) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

export { CategorySelect };
