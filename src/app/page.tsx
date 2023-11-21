import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex  items-center justify-center  ">
      <div className=" mx-auto w-full  ">
        <header className="sticky my-4 flex items-center justify-between  px-2 lg:mb-16 lg:px-20">
          <Image width="202" height="51" src="/images/header logo.svg" alt="" />
          <Button className="rounded-2xl">
            <Link href="/inscription"> التسجيل الإلكتروني</Link>
          </Button>
        </header>

        <div className=" lg:mb-16">
          <div className=" my-4  flex w-full flex-col items-center justify-center lg:mb-10 lg:flex-row lg:justify-around  ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="py-3 text-3xl font-bold lg:text-4xl ">
                من أجل جيل يحمل القرآن
              </h1>
              <p className=" px-8 text-center lg:text-xl lg:font-semibold ">
                يتخلَّق بأخلاقه يجعله منهاجه ، يحيا بنهجه ، <br />
                يبلِّغ رسالاته ، من أجل طليعة للربَّانيين ،<br /> تنير درب
                الأجيال الصَّاعدة.
              </p>
            </div>
            <Image
              src="/images/kid-illustration-colored.jpg"
              alt=""
              width={430}
              height={362}
            />
          </div>
          <div className=" my-4 flex flex-col items-center justify-center text-center  lg:flex-row-reverse lg:justify-around ">
            <div>
              <h1 className="py-3 text-3xl font-bold lg:text-4xl">
                الهدف العام
              </h1>
              <p className=" lg font-semibold lg:text-2xl">
                تعهد الفرد المسلم بالتكوين المنتظم
                <br /> بما يرقيه دينيا و خلقيا و فكريا
              </p>
            </div>
            <Image
              src="/images/praying-woman.png"
              alt=""
              width={430}
              height={362}
            />
          </div>
        </div>
        <div className="lg:mb-16">
          <h1 className="py-3 text-center text-3xl font-bold lg:text-4xl ">
            أنشطة المؤسسة
          </h1>
          <ul className="flex list-inside list-disc flex-col gap-1.5 px-2  lg:items-center lg:justify-center lg:gap-4 lg:text-2xl lg:font-semibold ">
            <li>تعليم القرآن الكريم و علومه</li>
            <li>تأهيل الطفل بأفكار تربوية</li>
            <li>
              إحتواء الشباب بتوفير بيئة إيمانية و فكرية سليمة تحفظهم من الإنحراف
            </li>
            <li>صناعة المربين و المربيات و تجهيزهم للعطاء المستقبلي</li>
            <li>تفعيل و تنشيط العمل الرعوي النسوي</li>
            <li>إقامة الدورات التكوينية في المجال الشرعي و الثقافي و الفكري</li>
            <li>إقامة النشاطات التي تنمي المهارات الدراسية و الحياتية</li>
            <li>تنمية الميول الإيجابية نحو التعلم و الشغف بالمعرفة و النجاح</li>
          </ul>
        </div>
        <div className=" lg:mb-16 lg:flex  lg:justify-around">
          <div className="flex flex-col items-center gap-3 pb-6 lg:gap-5">
            <h2 className="py-3 text-center text-3xl font-bold lg:text-4xl">
              مجموعات المؤسسة
            </h2>
            <Image src="/images/jil-logo.png" alt="" width={230} height={230} />
            <div className=" flex gap-24">
              <a href="https://www.facebook.com/groups/244723067064797">
                <Image
                  src="/assets/facebook.svg"
                  alt=""
                  width={48}
                  height={48}
                />
              </a>
              <a href="https://t.me/+MVCSCW9B7gdmZjk0">
                <Image
                  src="/assets/telegam.svg"
                  alt=""
                  width="48"
                  height="48"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-5">
            <h2 className="py-3 text-center text-3xl font-bold lg:text-4xl ">
              تحت إشراف
            </h2>
            <Image
              src="/images/director-image.png"
              alt=""
              width={320}
              height={820}
            />
            <p className="py-3 text-center text-2xl  lg:text-4xl lg:font-bold">
              يوسف بن عبد الصمد جاري
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
