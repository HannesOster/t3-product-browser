"use client";
import useQueryFilter from "~/lib/use-query-filter";
import { SearchInput } from "./search-input";
import { CategorySelect } from "./category-select";
import { SortSelect } from "./sort-select";

export function ProductFilterBar({ admin = false }: { admin?: boolean }) {
  const [filters, setFilters] = useQueryFilter();
  const { search, category, sort } = filters;

  return (
    <form
      className={`mb-4 flex ${admin ? "flex-col" : "flex-wrap items-center"} gap-2`}
      onSubmit={(e) => e.preventDefault()}
    >
      <SearchInput
        value={search ?? ""}
        setValue={(v) => void setFilters({ search: v })}
      />
      <CategorySelect
        value={category}
        setValue={(v) => void setFilters({ category: v })}
      />
      <SortSelect value={sort} setValue={(v) => void setFilters({ sort: v })} />
    </form>
  );
}
