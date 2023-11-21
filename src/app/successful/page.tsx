import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Successful = () => {
  return (
    <>
      <header className="sticky my-4 flex items-center justify-center  pb-2  ">
        <Link href="/">
          {" "}
          <Image width="202" height="51"  src="/images/header logo.svg" alt="" />
        </Link>
      </header>

      <div className=" flex min-h-full justify-center p-8">
        <section className="flex flex-col    items-center justify-around gap-14 rounded-3xl lg:w-[85%]   lg:flex-row-reverse lg:gap-7 lg:rounded-[100px] lg:py-6  ">
          <div className="image ">
            {/* <Image
              width={201}
              height={51}
              src="/images/header-logo.png"
              alt="happy man - successful registration illustration"
            /> */}

            <Image
              src="/images/success_illustration.svg"
              alt=""
              width={518}
              height={524}
            />
          </div>
          <div className="flex flex-col gap-7 text-center">
            <h1 className="text-darkgreen text-3xl font-extrabold">
              تمَّ التسجيل بنجاح!
            </h1>
            <p className=" text-darkgreen text-xl ">
              تهانينا! تم تسجيلك بنجاح. مرحبًا بك في مؤسسة الجيل الصاعد!
              <br /> نحن سعداء لوجودك معنا.
            </p>
            <Link href="/">
              <Button className=" rounded-2xl px-3 py-6 text-2xl lg:px-6 lg:py-9">
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Successful;
// .main-content{
//     height: 40%;
//     box-shadow: 0px 0px 49px 4px rgba(0, 0, 0, 0.11);
//     display: flex;
//     justify-content: center;
//     padding: 10%;
//     border-radius: 200px;
//     width: 75%;
// }
