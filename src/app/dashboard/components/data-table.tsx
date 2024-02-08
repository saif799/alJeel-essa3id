"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RemoveHizb, addHizb } from "@/lib/server-functions/post";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,

  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      columnFilters,
      rowSelection,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  const { isLoading: addedHizbLoading, mutate: addAhzab } =
    useMutation(addHizb);
  const { isLoading: removedHizbLoading, mutate: removeHizb } =
    useMutation(RemoveHizb);

  const OnAddHizbClick = () => {
    const selected = Object.keys(rowSelection);
    const idsToUpdate = selected.map(
      (index) => (data[+index] as { id: string }).id,
    );
    addAhzab(idsToUpdate, {
      onSuccess: () => {
        toast({
          title: "hizb added successfully",
        });
        router.refresh();
        setRowSelection({});
      },
      onError: () =>
        toast({
          title: "there was an error adding a hizb",
        }),
    });
    return;
  };

  const OnRemoveHizb = () => {
    const selected = Object.keys(rowSelection);
    const idsToUpdate = selected.map(
      (index) => (data[+index] as { id: string }).id,
    );
    removeHizb(idsToUpdate, {
      onSuccess: () => {
        toast({
          title: "hizb deleted successfully",
        });
        router.refresh();
        setRowSelection({});
      },
      onError: () =>
        toast({
          title: "there was an error deleting a hizb",
        }),
    });
    return;
  };

  return (
    <div>
      <div className="flex items-center py-3">
        <div className="flex w-full justify-center">
          <Input
            placeholder="بحث"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="border h-full rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                // className="border-b-1 border-gray-100"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-right text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (

                
                <TableRow
                  // className="border-b-1 border-gray-100"
                  key={row.id  }
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" pr-1 text-darkgreen">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-3 space-x-2 pt-3 ">
        {Object.keys(rowSelection).length ? (
          <div className=" flex gap-3 ">
            <Button
              className="h-fit  py-1.5"
              disabled={
                Object.keys(rowSelection).length === 0 || addedHizbLoading
              }
              size="sm"
              onClick={OnAddHizbClick}
            >
              {" "}
              {addedHizbLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "إضافة حزب 1+"
              )}
            </Button>

            <Button
              disabled={
                Object.keys(rowSelection).length === 0 || removedHizbLoading
              }
              variant="destructive"
              className="h-fit  py-1.5 "
              size="sm"
              onClick={OnRemoveHizb}
            >
              {" "}
              {removedHizbLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "إنقاص حزب 1-"
              )}
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}
