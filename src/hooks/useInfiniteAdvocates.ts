import { useInfiniteApiQuery } from '@/hooks/useInfiniteApiQuery';
import { Advocate } from '../types';

interface UseInfiniteAdvocatesParams {
  limit?: number;
  enabled?: boolean;
}

export const useInfiniteAdvocates = ({
  limit = 100,
  enabled = true,
}: UseInfiniteAdvocatesParams = {}) => {
  return useInfiniteApiQuery<Advocate>({
    queryKey: ['advocates', 'infinite'],
    endpoint: '/api/advocates',
    limit,
    enabled,
  });
};