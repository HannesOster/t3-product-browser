"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import useQueryFilter from "~/lib/use-query-filter";

type PaginationControlsProps = {
  page: number;
  totalPages: number | undefined;
  windowSize?: number;
  isLoading?: boolean;
};

import { useState, useEffect } from "react";

export function PaginationControls({
  page,
  totalPages,
  windowSize = 7,
  isLoading,
}: PaginationControlsProps) {
  const [activePage, setActivePage] = useState(page);
  useEffect(() => {
    setActivePage(page);
  }, [page]);

  const start = Math.max(1, activePage - Math.floor(windowSize / 2));
  const end = Math.min(totalPages ?? 1, start + windowSize - 1);
  const adjustedStart = Math.max(1, end - windowSize + 1);

  const [filters, setFilters] = useQueryFilter();

  function handlePageChange(pageNum: number) {
    setActivePage(pageNum);
    void setFilters({ page: pageNum });
  }

  return (
    <Pagination
      className="mt-4 w-full max-w-full sm:w-auto sm:max-w-none"
      style={{ maxWidth: "250px" }}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {isLoading
          ? Array.from({ length: 7 }, (_, i) => (
              <PaginationItem key={i}>
                <div className="mx-auto h-9 w-9 animate-pulse rounded bg-gray-200" />
              </PaginationItem>
            ))
          : Array.from({ length: end - adjustedStart + 1 }, (_, i) => {
              const pageNum = adjustedStart + i;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={page === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange(Math.min(totalPages ?? 1, page + 1))
            }
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
