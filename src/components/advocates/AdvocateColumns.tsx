"use client";

import { Advocate } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
