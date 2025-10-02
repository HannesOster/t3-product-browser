"use client";
import useQueryFilter from "~/lib/use-query-filter";
import { Button } from "./ui/button";
import { SearchInput } from "./search-input";
import { CategorySelect } from "./category-select";
import { SortSelect } from "./sort-select";

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
      <SearchInput
        value={search ?? ""}
        setValue={(v) => void setFilters({ search: v })}
      />
      <CategorySelect
        value={category}
        setValue={(v) => void setFilters({ category: v })}
      />
      <SortSelect value={sort} setValue={(v) => void setFilters({ sort: v })} />
      <Button type="button" variant="outline" onClick={reset}>
        Reset
      </Button>
    </form>
  );
}
