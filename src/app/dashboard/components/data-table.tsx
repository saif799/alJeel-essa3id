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
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

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
    // pageCount: Math.ceil(data.length / 7),
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
          title: "تمّ التعديل بنجاح - إضافة حزب",
        });
        setRowSelection({});
      },

      onError: () =>
        toast({
          title: "فشل التعديل - حاول مرة أخرى",
          variant: "destructive",
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
          title: "تمّ التعديل بنجاح - خفض حزب",
        });
        setRowSelection({});
      },
      onError: () =>
        toast({
          title: "فشل التعديل - حاول مرة أخرى",
          variant: "destructive",
        }),
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-between pb-3 pt-2">
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
      <div className="min-h-[300px] grow ">
        <Table className="">
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
                      className="text-start text-black"
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className=" truncate pr-1 text-start text-darkgreen"
                    >
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

      <div className="flex flex-col-reverse items-center justify-between gap-3 px-2 lg:flex-row">
        {Object.keys(rowSelection).length ? (
          <div className=" flex gap-3 ">
            <Button
              className="h-fit  py-1.5"
              disabled={
                Object.keys(rowSelection).length === 0 ||
                addedHizbLoading ||
                removedHizbLoading
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
                Object.keys(rowSelection).length === 0 ||
                removedHizbLoading ||
                addedHizbLoading
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
        <div className="flex items-center gap-1">
          <Button
            className="border-input-secondary p-2 text-gray-600"
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLast className="h-4 w-4 " />
          </Button>

          <Button
            className="border-input-secondary p-2 text-gray-600 "
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronRight className="h-4 w-4 " />
          </Button>
          <p className="font-normal text-darkgreen ">
            {" "}
            {/* {` ${
              table.getState().pagination.pageIndex + 1
            } / ${table.getPageCount()}`} */}
            {` ${
              table.getState().pagination.pageIndex + 1
            } من ${table.getPageCount()}`}
          </p>
          <Button
            className="border-input-secondary p-2 text-gray-600"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronLeft className="h-4 w-4 " />
          </Button>

          <Button
            className="border-input-secondary p-2 text-gray-600"
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount())}
            disabled={!table.getCanNextPage()}
          >
            <ChevronFirst className="h-4 w-4 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
