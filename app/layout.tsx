"use client"
import Appbar from "@/components/Appbar";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { useState } from "react";
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [activeCategory, setActiveCategory] = useState<string>("Featured");
  return (
    <html lang="en">
      <body  style={{ margin: 0, overflowX:"hidden" }} className={notoSans.className}>
        <Appbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} >
        {children}
        </Appbar>
        </body>
    </html>
  );
}
