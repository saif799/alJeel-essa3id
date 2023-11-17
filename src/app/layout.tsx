import "@/styles/globals.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";

import { Inter, Noto_Sans_Arabic } from "next/font/google";

const inter = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  weight: "600",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` ${inter.className} rtl text-right`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
