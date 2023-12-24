import Image from "next/image";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { api } from "@/trpc/server";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Progress } from "@/components/ui/progress";
import { MyResponsivePie } from "@/components/piechart";

function getAge(birthDate: Date | undefined) {
  if (birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return 0;
}

export type student = {
  id: string;
  name: string;
  famillyName: string;
  Ahzab: number;
  group: string;
  dob: Date | undefined;
};

type StudentsArray = student[];

type GroupColors = Record<string, string>;

const groupColors: GroupColors = {
  إثمار: "hsl(186, 94%, 28%)",
  "الماهر بالقرآن براعم": "hsl(42, 100%, 48%)",
  إشراق: "hsl(307, 100%, 79%)",
  رواء: "hsl(307, 73%, 22%)",
  بذور: "hsl(307, 69%, 47%)",
  "شموس الأمة": "hsl(186, 69%, 46%)",
  "فتية الإسلام": "hsl(186, 50%, 78%)",
};

export default async function DemoPage() {
  // const students: StudentsArray = await api.post.getAllStudents.query();
  const numberOfStudents = await api.post.numberOfstudents.query();
  const GroupsCounts = await api.post.getGroupsCounts.query();

  // const AllStudents = students.map((std) => ({ ...std, age: getAge(std.dob) }));

  const AhzabSum = Math.round(
    GroupsCounts.reduce((sum, group) => sum + group.Ahzab!, 0) /
      (numberOfStudents.Females + numberOfStudents.Males),
  );
  // const ageSum = Math.round(
  //   students.reduce((sum, std) => sum + getAge(std.dob), 0) /
  //     (numberOfStudents.Females + numberOfStudents.Males),
  // );

  const bestGroup = GroupsCounts.reduce((maxGroup, currentGroup) => {
    return currentGroup.Ahzab! > maxGroup.Ahzab! ? currentGroup : maxGroup;
  }).id;

  const formatedGroupsCounts = GroupsCounts.map((group) => {
    return {
      id: group.id,
      value: group.value,
      color: groupColors[group.id]!,
    };
  });

  return (
    <div className=" flex h-screen">
      <div className=" basis-1/6 bg-lightgreen">
        <div className=" flex flex-col items-center gap-4 py-9">
          <Link href="/">
            <Image
              src="/assets/jil logo white.svg"
              alt="jeel-logo"
              width={112}
              height={120}
            />{" "}
          </Link>
          <h1 className=" text-2xl font-bold text-white  ">لوحة التحكم</h1>
          <div className="pt-10">
            <div className="flex gap-3 rounded-3xl bg-white px-5 py-2">
              <BarChart2 />
              <h3 className="text-xl font-medium ">الإحصائيات</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid basis-5/6 grid-cols-3 grid-rows-6 gap-x-10 gap-y-7 px-9 py-6">
        <div className="row-span-2 flex flex-col items-center justify-around  gap-3 rounded-3xl p-2 shadow-custom">
          <h2 className="text-2xl  text-darkgreen">مجموع الطلبة</h2>
          <p className="text-6xl font-semibold text-darkgreen ">
            {/* {AllStudents.length} */}
          </p>
          <h2 className="text-2xl  text-darkgreen"> موزعين على 7 أفواج</h2>
        </div>
        <div className="row-span-2 flex flex-col items-center justify-around gap-3 rounded-3xl shadow-custom">
          <h2 className="text-2xl  text-darkgreen"> عدد الذكور</h2>
          <p className="text-6xl font-semibold text-darkgreen ">
            {" "}
            {numberOfStudents.Males}
          </p>
          <div>
            <Progress
              gender="Male"
              className="bg-opacity-60"
              // value={(numberOfStudents.Males * 100) / AllStudents.length}
            />

            <p className=" w-52 pt-3 text-center text-blue-700">
              {/* {Math.round((numberOfStudents.Males * 100) / AllStudents.length)}% */}
            </p>
          </div>
        </div>
        <div className="row-span-2 flex flex-col items-center justify-around gap-3 rounded-3xl shadow-custom">
          <h2 className="text-2xl  text-darkgreen"> عدد الإناث</h2>
          <p className="text-6xl font-semibold text-darkgreen ">
            {numberOfStudents.Females}
          </p>
          <div className="  ">
            <div>
              <Progress
                gender="Female"
                // value={(numberOfStudents.Females * 100) / AllStudents.length}
              />
            </div>
            <p className=" w-52 pt-3 text-center text-pink-600">
              {/* {Math.round(
                (numberOfStudents.Females * 100) / AllStudents.length,
              )} */}
              %
            </p>
          </div>
        </div>
        <div className="col-span-2 row-span-4  rounded-3xl  shadow-custom ">
          <div className=" container   ">
            {/* <DataTable columns={columns} data={AllStudents} searchKey="name" /> */}
          </div>
        </div>

        <div className="col-span-1 row-span-4 flex flex-col justify-around rounded-3xl p-4 shadow-custom">
          <div className="relative basis-2/3">
            <MyResponsivePie data={formatedGroupsCounts} />
          </div>

          <div className="flex basis-1/3 flex-col items-center justify-center gap-5">
            <p className="text-lg">متوسط الحفظ : {AhzabSum}</p>
            {/* <p className="text-lg">متوسط الأعمار : {ageSum}</p> */}
            <p className="text-lg"> الفوج المتفوق : {bestGroup}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
