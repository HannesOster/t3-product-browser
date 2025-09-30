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

// Kategorien mit "none" als Platzhalter
const categories = [
  { value: "none", label: "Keine Kategorie" },
  { value: "Smartphones", label: "Smartphones" },
  { value: "Headphones", label: "Headphones" },
  { value: "Smartphone Accessories", label: "Smartphone Accessories" },
];

// Sortieroptionen mit "none" als Platzhalter
const sortOptions = [
  { value: "none", label: "Keine Sortierung" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
];

export function ProductFilterBar() {
  const [filters, setFilters] = useQueryFilter();
  const { search, category = "none", sort = "none" } = filters;

  const reset = () => {
    void setFilters({
      search: "",
      category: "none",
      sort: "none",
    });
  };

  return (
    <form
      className="mb-4 flex flex-wrap items-center gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Suche */}
      <Input
        type="search"
        placeholder="Suche..."
        value={search ?? ""}
        onChange={(e) => void setFilters({ search: e.target.value || "" })}
        className="w-40"
      />

      {/* Kategorie */}
      <Select
        value={category}
        onValueChange={(v) => void setFilters({ category: v })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Kategorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sortierung */}
      <Select value={sort} onValueChange={(v) => void setFilters({ sort: v })}>
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
