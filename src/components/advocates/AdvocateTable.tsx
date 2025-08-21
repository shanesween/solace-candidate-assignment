"use client";
import { useEffect, useRef } from "react";
import { DataTable } from "../shared/DataTable";
import { advocateColumns } from "./AdvocateColumns";
import { useInfiniteAdvocates } from "@/hooks/useInfiniteAdvocates";

interface AdvocateTableProps {
    className?: string;
}

export function AdvocateTable({ className = "" }: AdvocateTableProps) {

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteAdvocates({});

    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Flatten paginated data
    const advocates = data?.pages.flatMap((page: any) => page.data) || [];


    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Trigger 100px before element is fully visible
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    if (isLoading) {
        return (
            <div className={`flex justify-center items-center h-64 ${className}`}>
                <div className="text-gray-500">Loading advocates...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`text-center text-red-500 ${className}`}>
                <div>Failed to load advocates</div>
                <button
                    onClick={() => refetch()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            <h1 className="text-2xl font-bold mb-6 flex-shrink-0">Solace Advocates</h1>
            <div className="flex-1 min-h-0">
                <DataTable
                    columns={advocateColumns}
                    data={advocates}
                    loadMoreRef={loadMoreRef}
                    isLoadingMore={isFetchingNextPage}
                    hasMore={hasNextPage}
                    noMoreMessage="No more advocates to load"
                    className="h-full"
                />
            </div>
        </div>
    );
}
