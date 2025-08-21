import { useApiQuery } from './useApiQuery';
import type { AdvocateSearchResult } from '../types';

interface UseAdvocateSearchParams {
  query: string;
  limit?: number;
  enabled?: boolean;
}

export const useAdvocateSearch = ({
  query,
  limit = 10,
  enabled = true
}: UseAdvocateSearchParams) => {
  const shouldSearch = enabled && query.trim().length >= 2;

  const endpoint = shouldSearch
    ? `/api/advocates/search?q=${encodeURIComponent(query.trim())}&limit=${limit}`
    : '';

  const result = useApiQuery<AdvocateSearchResult[]>(endpoint, {
    enabled: shouldSearch,
  });

  // Transform the result to maintain the same interface
  return {
    ...result,
    data: result.data?.data || [],
  };
};