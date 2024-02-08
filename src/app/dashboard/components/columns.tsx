"use client";

import { type ColumnDef } from "@tanstack/react-table";


import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type CheckedState } from "@radix-ui/react-checkbox";

import Link from "next/link";

export type Student = {
  id: string;
  name: string;
  famillyName: string;
  Ahzab: number;
  group: string;
  age: number;
};

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-1  border-1 border-lightgreen"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: CheckedState) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-1 border-1 border-lightgreen "
        checked={row.getIsSelected()}
        onCheckedChange={(value: CheckedState) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "الإسم",
    cell: ({ row }) => {
      return (
        <Link href={`dashboard/${row.original.id}`}>{row.original.name} </Link>
      );
    },
  },
  {
    accessorKey: "famillyName",
    header: "اللقب",
  },
  {
    accessorKey: "group",
    header: "الفوج",
  },
  {
    accessorKey: "age",
    header: "العمر",
  },
  {
    accessorKey: "Ahzab",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right text-black"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          عدد الأحزاب
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
