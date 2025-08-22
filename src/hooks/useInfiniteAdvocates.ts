import { useInfiniteApiQuery } from './useInfiniteApiQuery';
import { Advocate } from '../types';

interface UseInfiniteAdvocatesParams {
  limit?: number;
  enabled?: boolean;
}

export const useInfiniteAdvocates = ({
  limit = 100,
  enabled = true,
}: UseInfiniteAdvocatesParams = {}) => {
  return useInfiniteApiQuery<Advocate>('/api/advocates', {
    limit,
    enabled,
  });
};