import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '../types';

interface UseInfiniteApiQueryOptions<T> {
  enabled?: boolean;
  limit?: number;
  staleTime?: number;
  gcTime?: number;
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
  // TODO: add type safety for the URLSearchParams and support for other query params
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  if (pageParam) params.append('cursor', pageParam);

  const response = await fetch(`${endpoint}?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return response.json();
};

export const useInfiniteApiQuery = <T>(
  endpoint: string,
  options: UseInfiniteApiQueryOptions<T> = {}
) => {
  if (!endpoint) {
    throw new Error('No endpoint provided');
  }

  const {
    enabled = true,
    limit = 100,
    staleTime = 5 * 60 * 1000, // 5 minutes
    gcTime = 10 * 60 * 1000, // 10 minutes
  } = options;
  return useInfiniteQuery({
    queryKey: [endpoint, { limit }],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      fetchPage<T>({ pageParam, limit, endpoint }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: null as string | null,
    enabled: enabled && !!endpoint,
    staleTime,
    gcTime,
  });
};