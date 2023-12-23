"use client";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ColumnDef } from "@tanstack/react-table";


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
    accessorKey: "name",
    header: "الإسم",
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
    header: "عدد الأحزاب",
  },
];
