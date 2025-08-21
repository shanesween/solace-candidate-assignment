"use client";

import { Advocate } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Chip } from "@/components/ui/Chip";

export const advocateColumns: ColumnDef<Advocate>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
        enableSorting: true,
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        enableSorting: true,
    },
    {
        accessorKey: "city",
        header: "City",
        enableSorting: true,
    },
    {
        accessorKey: "degree",
        header: "Degree",
        enableSorting: false,
    },
    {
        accessorKey: "specialties",
        header: "Specialties",
        enableSorting: false,
        cell: ({ row }) => {
            const specialties = row.getValue("specialties") as string[];
            const displayCount = 2; // Show first 2 specialties
            const hasMore = specialties.length > displayCount;

            return (
                <div className="flex flex-wrap gap-1">
                    {specialties.slice(0, displayCount).map((specialty, index) => (
                        <Chip key={index} variant="primary" size="sm">
                            {specialty}
                        </Chip>
                    ))}
                    {hasMore && (
                        <Chip variant="primary" size="sm">
                            +{specialties.length - displayCount}
                        </Chip>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "yearsOfExperience",
        header: "Years of Experience",
        enableSorting: true,
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        enableSorting: false,
    },
];
