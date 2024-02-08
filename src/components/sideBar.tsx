import { BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className=" basis-1/6 bg-lightgreen">
      <div className=" flex flex-col items-center gap-4 py-8">
        <Link href="/">
          <Image
            src="/images/jil_logo_white.webp"
            alt="jeel-logo"
            width={112}
            height={120}
            loading="eager"
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
  );
};

export default SideBar;
