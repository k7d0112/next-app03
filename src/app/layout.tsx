import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from './_components/Header';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ブログサイト",
  description: "NextJs課題用の簡易版ブログサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-white text-black`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
