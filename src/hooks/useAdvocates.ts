import { Advocate } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface AdvocatesResponse {
  data: Advocate[];
}

const fetchAdvocates = async (): Promise<Advocate[]> => {
  const response = await fetch('/api/advocates');

  if (!response.ok) {
    throw new Error('Failed to fetch advocates');
  }

  const result: AdvocatesResponse = await response.json();
  return result.data;
};

export const useAdvocates = () => {
  return useQuery({
    queryKey: ['advocates'],
    queryFn: fetchAdvocates,
  });
};