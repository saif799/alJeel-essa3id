import Image from "next/image";
import { Phone } from "lucide-react";

// import from "";

const Footer = () => {
  return (
    <footer className=" flex flex-col items-center gap-5 bg-border">
      <Image
        src="/assets/jil logo white.svg"
        alt="jeel-logo"
        width={50}
        height={50}
      />
      <div className="footr phone-number">
        {/* <Image src="assets/phone_icon.svg" alt="" width={20} height={20} /> */}
        <Phone className=" text-white" />
        <p>0779311115</p>
      </div>
      <div className="footr address">
        <Image
          src="assets/location_icon_white.svg"
          alt=""
          height={20}
          width={20}
        />
        <a href="https://www.google.com/maps/place/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9+%D8%A7%D9%84%D8%AC%D9%8A%D9%84+%D8%A7%D9%84%D8%B5%D8%A7%D8%B9%D8%AF+%D9%84%D9%84%D8%AA%D8%A3%D9%87%D9%8A%D9%84+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%E2%80%AD/@36.2049951,5.4167583,17z/data=!4m14!1m7!3m6!1s0x12f315fbac9320f3:0xb08b470fdf561678!2z2YXYpNiz2LPYqSDYp9mE2KzZitmEINin2YTYtdin2LnYryDZhNmE2KrYo9mH2YrZhCDYp9mE2KrYsdio2YjZig!8m2!3d36.2050797!4d5.4167286!16s%2Fg%2F11krbxkzmx!3m5!1s0x12f315fbac9320f3:0xb08b470fdf561678!8m2!3d36.2050797!4d5.4167286!16s%2Fg%2F11krbxkzmx?entry=ttu">
          <p>حي لعرارسة قطاع ب، مقابل عمارات قاوة، بالقرب من مسجد خديجة.</p>
        </a>
      </div>
      <p className="">
        تصميم و تجسيد :{" "}
        <a href="https://personal-blog-five-zeta.vercel.app/">بقزيز مهدي</a>،{" "}
        <a href="https://github.com/DjariAB">جاري عبد الباسط</a>
      </p>
    </footer>
  );
};

export default Footer;
