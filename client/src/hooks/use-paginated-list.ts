"use client";
import { PaginationResponse } from "@/type/meta.type";
import { useCallback, useEffect, useState } from "react";


interface UsePaginatedListOptions<T, F> {
  fetchData: (
    params: {
      page: number;
      limit: number;
    } & F,
  ) => Promise<PaginationResponse<T>>;
  limit?: number;
}

export default function usePaginatedList<T, F extends object>({
  fetchData,
  limit = 10,
}: UsePaginatedListOptions<T, F>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<F>({} as F);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetchData({
        page,
        limit,
        ...filters,
      } as { page: number; limit: number } & F);

      setData(response.data);
      setTotalPages(response.meta.totalPages);
      setTotal(response.meta.total);
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, limit, filters]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const handleFiltersChange = (newFilters: F) => {
    setPage(1);
    setFilters(newFilters);
  };

  return {
    data,
    page,
    limit,
    total,
    totalPages,
    filters,
    loading,
    setPage,
    setFilters: handleFiltersChange,
    fetch,
  };
}