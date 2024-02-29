import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Progress } from "@/components/ui/progress";
import { MyResponsivePie } from "@/components/piechart";
import { db } from "@/server/db";
import ResponsiveWrapper from "@/components/responsiveWrapper";
// import { TableWrapper } from "@/components/TableWrapper";

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
  const studentsPromise = db.student.findMany({
    orderBy: {
      Ahzab: "desc",
    },
  });

  const femalesNbrPromise = db.student.count({
    where: {
      sex: "Female",
    },
  });

  const malesNbrPromise = db.student.count({
    where: {
      sex: "Male",
    },
  });

  const GroupsCountsPromise = db.student.groupBy({
    by: ["group"],
    _count: true,
    _sum: {
      Ahzab: true,
    },
  });

  const [students, femalesNbr, malesNbr, GroupsCounts] = await Promise.all([
    studentsPromise,
    femalesNbrPromise,
    malesNbrPromise,
    GroupsCountsPromise,
  ]);

  const AllStudents = students.map((student) => ({
    ...student,
    age: getAge(student.dob),
  }));

  const AhzabSum = Math.round(
    GroupsCounts.reduce((sum, group) => sum + group._sum.Ahzab!, 0) /
      (femalesNbr + malesNbr),
  );

  const ageSum = Math.round(
    AllStudents.reduce((sum, student) => sum + student.age, 0) /
      (malesNbr + femalesNbr),
  );

  const formattedGroupCounts = GroupsCounts.map((groupCount) => ({
    id: groupCount.group,
    value: groupCount._count,
    ...groupCount._sum,
  }));
  const bestGroup = formattedGroupCounts.reduce((maxGroup, currentGroup) => {
    return currentGroup.Ahzab! > maxGroup.Ahzab! ? currentGroup : maxGroup;
  }).id;

  const formatedGroupsCountsForObject = formattedGroupCounts.map((group) => {
    return {
      id: group.id,
      value: group.value,
      color: groupColors[group.id]!,
    };
  });

  return (
    <div className=" lg:grid lg:basis-5/6 lg:grid-cols-3 lg:grid-rows-6 lg:gap-x-10 lg:gap-y-7 lg:divide-none lg:px-9 lg:py-5">
      <ResponsiveWrapper className="flex flex-col items-center justify-around gap-3  pb-5 lg:row-span-2 ">
        <h2 className="text-2xl  text-darkgreen">مجموع الطلبة</h2>
        <p className="text-6xl font-semibold text-darkgreen ">
          {AllStudents.length}
        </p>
        <h2 className="text-2xl  text-darkgreen"> موزعين على 7 أفواج</h2>
      </ResponsiveWrapper>
      <ResponsiveWrapper className="flex flex-col items-center justify-around gap-3 lg:row-span-2">
        <h2 className="text-2xl  text-darkgreen"> عدد الذكور</h2>
        <p className="text-6xl font-semibold text-darkgreen ">{malesNbr}</p>
        <div>
          <Progress
            gender="Male"
            className="bg-opacity-60"
            value={(malesNbr * 100) / AllStudents.length}
          />

          <p className=" w-52 pt-3 text-center text-blue-700">
            {Math.round((malesNbr * 100) / AllStudents.length)}%
          </p>
        </div>
      </ResponsiveWrapper>

      <ResponsiveWrapper className="flex flex-col items-center justify-around gap-3 lg:row-span-2">
        <h2 className="text-2xl  text-darkgreen"> عدد الإناث</h2>
        <p className="text-6xl font-semibold text-darkgreen ">{femalesNbr}</p>
        <div className="  ">
          <div>
            <Progress
              gender="Female"
              value={(femalesNbr * 100) / AllStudents.length}
            />
          </div>
          <p className=" w-52 pt-3 text-center text-pink-600">
            {Math.round((femalesNbr * 100) / AllStudents.length)}%
          </p>
        </div>
      </ResponsiveWrapper>

      <ResponsiveWrapper className="container  border-1 lg:col-span-2 lg:row-span-4">
        <DataTable columns={columns} data={AllStudents} searchKey="name" />
      </ResponsiveWrapper>

      <ResponsiveWrapper className="lg:border m-2  rounded-lg border-1 p-4 lg:col-span-1 lg:row-span-4 lg:m-0">
        <div className="h-72">
          <MyResponsivePie data={formatedGroupsCountsForObject} />
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-lg">متوسط الحفظ : {AhzabSum} أحزاب</p>
          <p className="text-lg">متوسط الأعمار : {ageSum}</p>
          <p className="text-lg"> الفوج المتفوق : {bestGroup}</p>
        </div>
      </ResponsiveWrapper>
    </div>
  );
}
