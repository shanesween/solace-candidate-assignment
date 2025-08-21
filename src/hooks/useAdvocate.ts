import { useApiQuery } from './useApiQuery';
import type { Advocate } from '../types';

interface UseAdvocateParams {
  id: number;
  enabled?: boolean;
}

export const useAdvocate = ({ id, enabled = true }: UseAdvocateParams) => {
  const isValidId = !isNaN(id) && id > 0;
  const endpoint = enabled && isValidId ? `/api/advocates/${id}` : '';

  const result = useApiQuery<Advocate>(endpoint, {
    enabled: enabled && isValidId,
  });

  // Transform the result to maintain the same interface
  return {
    ...result,
    data: result.data?.data,
  };
};