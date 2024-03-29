import "@/styles/globals.css";

import { QueryClientWrapper } from "@/lib/wrappers/query";

import { Noto_Sans_Arabic } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
});

export const metadata = {
  title: "مؤسسة الجيل الصاعد للتأهيل التربوي",
  description:
    "مؤسسة الجيل الصاعد للتأهيل التربوي هي مؤسسة شبابية إصلاحية تهدف لإحتواء الجيل الصاعد و توفير بيئة إيمانية و فكرية سليمة تحفظهم من الإنحراف",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` ${inter.className} rtl overscroll-none text-right`}>
        <QueryClientWrapper>
          <Toaster />
          {children}
        </QueryClientWrapper>
      </body>
    </html>
  );
}
