"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { User } from "lucide-react";

import { type ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type CheckedState } from "@radix-ui/react-checkbox";

import InfoBlock from "@/components/infoBlock";
import Image from "next/image";

export type Student = {
  id: string;
  name: string;
  famillyName: string;
  Ahzab: number;
  group: string;
  age: number;
  parentName: string;
  studentPhoneNumber: string | null;
  parentNumber: string;
  facbookAcount: string | null;
  educational_level: string;
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
        <Dialog>
          <DialogTrigger className=" min-w-[100px] text-start text-darkgreen">
            {row.original.name}
          </DialogTrigger>
          <DialogContent className="p-0">
            <StudentInfo original={row.original} />
          </DialogContent>
        </Dialog>
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

const StudentInfo = (row: { original: Student }) => {
  return (
    <div className=" w-[1108]   pb-4">
      <div className="flex flex-col items-center pb-20 ">
        <Image
          className=" h-[145px] w-full rounded-t-3xl  object-cover"
          src="/images/profile_background.webp"
          alt="profile backgorund"
          width={1108}
          height={0}
        />

        <div className=" absolute top-8 z-40 flex h-48 w-48 items-center justify-center rounded-full bg-lightgreen">
          <User className="relative h-24 w-24 text-white " />
        </div>
      </div>
      {/* first section */}
      <div className="pb-5">
        <div className="flex items-center gap-7 pl-16 pr-9">
          <h4 className="text-2xl/9 font-medium text-lightgreen">
            معلومات شخصية
          </h4>
          <hr className=" flex-1  rounded   border-1 border-lightgreen  opacity-40  " />
        </div>

        <div className="flex w-full  justify-around ">
          <div className=" flex flex-1 pr-12">
            <InfoBlock name="الإسم" content={row.original.name} />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock name="اللقب" content={row.original.famillyName} />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock name="إسم الولي" content={row.original.parentName} />
          </div>
        </div>
      </div>
      {/* second section */}

      <div className="pb-5">
        <div className="flex items-center gap-7 pl-16 pr-9">
          <h4 className="text-2xl/9 font-medium text-lightgreen">
            معلومات عامة
          </h4>
          <hr className=" flex-1  rounded   border-1 border-lightgreen  opacity-40  " />
        </div>

        <div className="flex w-full justify-around">
          <div className=" flex flex-1 pr-12">
            <InfoBlock name="الفوج" content={row.original.group} />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock name="عدد الأحزاب" content={row.original.Ahzab} />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock
              name="المستوى الدراسي"
              content={row.original.educational_level}
            />
          </div>
        </div>
      </div>
      {/* third section */}

      <div className="pb-5">
        <div className="flex items-center gap-7 pl-16 pr-9">
          <h4 className="text-2xl/9 font-medium text-lightgreen">
            معلومات الإتصال
          </h4>
          <hr className=" flex-1  rounded   border-1 border-lightgreen  opacity-40  " />
        </div>

        <div className="flex w-full justify-around">
          <div className=" flex flex-1 pr-12">
            <InfoBlock
              name="حساب الفايسبوك"
              content={row.original.facbookAcount}
            />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock
              name="رقم هاتف الولي"
              content={row.original.parentNumber}
            />
          </div>

          <div className=" flex-1 pr-9">
            <InfoBlock
              name="رقم هاتف الطالب"
              content={row.original.studentPhoneNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
