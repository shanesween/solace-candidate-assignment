"use client";

import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    className?: string;
    // Infinite scroll support
    loadMoreRef?: React.RefObject<HTMLDivElement>;
    isLoadingMore?: boolean;
    hasMore?: boolean;
    noMoreMessage?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    className = "",
    loadMoreRef,
    isLoadingMore,
    hasMore,
    noMoreMessage = "No more results to load",
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Scrollable Table Container */}
            <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
                <table className="w-full min-w-max">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className={`${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                                        }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                        {/* Infinite Scroll Trigger */}
                        {loadMoreRef && (
                            <tr>
                                <td colSpan={columns.length} className="p-0">
                                    <div ref={loadMoreRef} className="flex justify-center py-4">
                                        {isLoadingMore && (
                                            <div className="text-gray-500">Loading more...</div>
                                        )}
                                        {!hasMore && data.length > 0 && (
                                            <div className="text-gray-500">{noMoreMessage}</div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
