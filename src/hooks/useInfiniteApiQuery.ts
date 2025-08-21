import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '../types';

interface UseInfiniteApiQueryParams<T> {
  queryKey: (string | Record<string, any>)[];
  endpoint: string;
  limit?: number;
  enabled?: boolean;
}

interface FetchPageParams {
  pageParam: string | null;
  limit: number;
  endpoint: string;
}

const fetchPage = async <T>({
  pageParam,
  limit,
  endpoint
}: FetchPageParams): Promise<PaginatedResponse<T>> => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  if (pageParam) params.append('cursor', pageParam);

  const response = await fetch(`${endpoint}?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return response.json();
};

export const useInfiniteApiQuery = <T>({
  queryKey,
  endpoint,
  limit = 100,
  enabled = true,
}: UseInfiniteApiQueryParams<T>) => {
  return useInfiniteQuery({
    queryKey: [...queryKey, { limit }],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      fetchPage<T>({ pageParam, limit, endpoint }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: null as string | null,
    enabled,
  });
};