"use client";
import useQueryFilter from "~/lib/use-query-filter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
//TODO: Categories auch mit value und label versehen
const categories = [
  "Keine Kategorie",
  "Smartphones",
  "Headphones",
  "Smartphone Accessories",
];
const sortOptions = [
  { value: "none", label: "Keine Sortierung" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
];

export function ProductFilterBar() {
  const [filters, setFilters] = useQueryFilter();

  const { search, category, sort } = filters;

  const reset = () => {
    void setFilters({
      search: "",
      category: "",
      sort: "",
    });
  };

  return (
    <form
      className="mb-4 flex flex-wrap items-center gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="search"
        placeholder="Suche..."
        value={search ?? ""}
        onChange={(e) => {
          void setFilters({ search: e.target.value || "" });
        }}
        className="w-40"
      />
      <Select
        value={category}
        onValueChange={(v) => {
          void setFilters({ category: v });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Kategorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sort}
        onValueChange={(v) => {
          void setFilters({ sort: v });
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sortierung" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="button" variant="outline" onClick={reset}>
        Reset
      </Button>
    </form>
  );
}
