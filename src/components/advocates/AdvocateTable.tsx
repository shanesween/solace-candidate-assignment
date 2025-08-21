"use client";
import { DataTable } from "../shared/DataTable";
import { advocateColumns } from "./AdvocateColumns";
import { useAdvocates } from "@/hooks/useAdvocates";

interface AdvocateTableProps {
    className?: string;
}

export function AdvocateTable({ className = "" }: AdvocateTableProps) {
    const { data, isLoading, error, refetch } = useAdvocates();

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

    const advocates = data || [];

    return (
        <div className={className}>
            <DataTable
                columns={advocateColumns}
                data={advocates}
                searchKey="global"
                searchPlaceholder="Search advocates by name, city, degree, or specialties..."
                className="w-full"
            />
        </div>
    );
}
