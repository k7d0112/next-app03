import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  Link  from "next/link";
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
        <header className='p-6 bg-zinc-800 flex justify-between items-center'>
          <h1><Link href='/' className='text-white font-sans font-bold'>Blog</Link></h1>
          <Link href='/contact' className='text-white font-sans font-bold'>お問い合わせ</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
