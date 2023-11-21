import "@/styles/globals.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";

import { Inter, Noto_Sans_Arabic } from "next/font/google";

const inter = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  // weight: "700",
});

export const metadata = {
  title: "aljeel-assa3id",
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
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
