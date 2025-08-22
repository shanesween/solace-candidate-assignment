import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { ApiResponse } from "../types";

interface UseApiQueryOptions<TData, TError = Error> extends Omit<UseQueryOptions<ApiResponse<TData>, TError>, 'queryKey' | 'queryFn'> {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
    gcTime?: number;
}

export function useApiQuery<TData>(
    endpoint: string,
    options: UseApiQueryOptions<TData> = {}
): UseQueryResult<ApiResponse<TData>, Error> {
    const {
        enabled = true,
        refetchOnWindowFocus = false,
        staleTime = 5 * 60 * 1000, // 5 minutes
        gcTime = 10 * 60 * 1000, // 10 minutes
        ...queryOptions
    } = options;

    return useQuery<ApiResponse<TData>, Error>({
        queryKey: [endpoint],
        queryFn: async (): Promise<ApiResponse<TData>> => {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        },
        enabled,
        refetchOnWindowFocus,
        staleTime,
        gcTime,
        ...queryOptions,
    });
}
