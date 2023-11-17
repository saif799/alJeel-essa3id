import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { api } from "@/trpc/server";
import { CreatePost } from "@/app/_components/create-post";

const Testing = () => {
  return (
    <div className=" mx-auto ">
      <header className="sticky my-4 flex   items-center justify-between px-2">
        {/* <img src="images/header logo.svg"> */}
        <Image width={201} height={51} src="/images/header-logo.png" alt="" />
        {/* <button>التسجيل الإلكتروني</button> */}
        <Button className="rounded-2xl">
          <Link href="/inscription"> التسجيل الإلكتروني</Link>
        </Button>
      </header>

      <div className=" my-4  flex flex-col items-center justify-center ">
        <h1 className="py-3 text-3xl font-bold">من أجل جيل يحمل القرآن</h1>
        <p className=" px-8 text-center ">
          يتخلَّق بأخلاقه يجعله منهاجه ، يحيا بنهجه ، <br />
          يبلِّغ رسالاته ، من أجل طليعة للربَّانيين ،<br /> تنير درب الأجيال
          الصَّاعدة.
        </p>
        {/* <img src="images/kid illustration colored.jpg"> */}
        <Image
          src="/images/kid-illustration-colored.jpg"
          alt=""
          width={1080}
          height={909}
        />
      </div>
      <div className=" my-4 flex flex-col items-center justify-center text-center">
        <h1 className="py-3 text-3xl font-bold">الهدف العام</h1>
        <p>
          تعهد الفرد المسلم بالتكوين المنتظم
          <br /> بما يرقيه دينيا و خلقيا و فكريا
        </p>
        {/* <img src="images/praying woman.png"> */}
        <Image
          src="/images/praying-woman.png"
          alt=""
          width={1200}
          height={1200}
        />
      </div>
      <h1 className="py-3 text-center text-3xl font-bold ">أنشطة المؤسسة</h1>
      <ul className="flex list-inside list-disc flex-col gap-1.5 px-2 ">
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
      <div className="flex flex-col items-center">
        <h2 className="py-3 text-center text-3xl font-bold ">
          مجموعات المؤسسة
        </h2>
        {/* <img src="images/jil logo.png"> */}
        <Image src="/images/jil-logo.png" alt="" width={120} height={128} />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="py-3 text-center text-3xl font-bold ">تحت إشراف</h2>
        {/* <img src="images/director image.png"> */}
        <Image
          src="/images/director-image.png"
          alt=""
          width={320}
          height={820}
        />
        <p className="py-3 text-center text-2xl  ">يوسف بن عبد الصمد جاري</p>
      </div>
    </div>
  );
};

export default Testing;

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div>
      <div className="w-full max-w-xs">
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}

        <CreatePost />
      </div>
    </div>
  );
}
