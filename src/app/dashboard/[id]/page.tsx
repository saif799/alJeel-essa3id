import { db } from "@/server/db";
import Image from "next/image";
import Link from "next/link";
import { BarChart2, User } from "lucide-react";
import InfoBlock from "@/components/infoBlock";

const Student = async ({ params }: { params: { id: string } }) => {
  const studentInfo = await db.student.findFirst({ where: { id: params.id } });
  if (!studentInfo) return <div> student not found</div>;

  return (
    <div className="flex h-screen">
      <div className=" basis-1/6 bg-lightgreen">
        <div className=" flex flex-col items-center gap-4 py-8">
          <Link href="/">
            <Image
              src="/images/jil_logo_white.webp"
              alt="jeel-logo"
              width={112}
              height={120}
            />{" "}
          </Link>
          <h1 className=" text-2xl font-bold text-white">لوحة التحكم</h1>
          <div className="pt-10">
            <div className="flex gap-3 rounded-3xl bg-white px-5 py-2">
              <BarChart2 />
              <h3 className="text-xl font-medium ">الإحصائيات</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-5/6 ">
        <div className="flex flex-col items-center pb-28">
          <Image
            className="h-[145px] w-full object-cover"
            src="/images/profile_background.webp"
            alt="profile backgorund"
            width={1108}
            height={0}
          />

          <div className=" absolute top-10 z-40 flex h-48 w-48 items-center justify-center rounded-full bg-lightgreen">
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

          <div className="flex w-full justify-around">
            <div className=" flex flex-1 pr-12">
              <InfoBlock name="الإسم" content={studentInfo.name} />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock name="اللقب" content={studentInfo.famillyName} />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock name="إسم الولي" content={studentInfo.parentName} />
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
              <InfoBlock name="الفوج" content={studentInfo.group} />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock name="عدد الأحزاب" content={studentInfo.Ahzab} />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock
                name="المستوى الدراسي"
                content={studentInfo.educational_level}
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
                content={studentInfo.facbookAcount}
              />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock
                name="رقم هاتف الولي"
                content={studentInfo.parentNumber}
              />
            </div>

            <div className=" flex-1 pr-9">
              <InfoBlock
                name="رقم هاتف الطالب"
                content={studentInfo.studentPhoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
