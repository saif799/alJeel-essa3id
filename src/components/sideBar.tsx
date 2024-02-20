import { AlignJustify, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="  bg-lightgreen lg:basis-1/6 ">
      <div className=" flex flex-row-reverse items-center justify-between px-3 py-3 lg:flex-col lg:justify-start lg:gap-4 lg:py-8">
        <Link href="/">
          <Image
            className="h-12 w-11 lg:h-[120px] lg:w-28"
            src="/images/jil_logo_white.webp"
            alt="jeel-logo"
            width={112}
            height={120}
            loading="eager"
          />{" "}
        </Link>
        <h1 className=" text-2xl font-bold text-white  ">لوحة التحكم</h1>

        <div className="mt-10 hidden gap-3 rounded-3xl bg-white px-5  py-2 lg:flex ">
          <BarChart2 />
          <h3 className="text-xl font-medium ">الإحصائيات</h3>
        </div>
        <div className="lg:hidden">
          <AlignJustify className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
