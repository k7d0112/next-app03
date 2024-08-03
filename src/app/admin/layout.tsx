'use client'

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metaData: Metadata = {
  title: 'ブログサイト＿管理者ページ',
  description: 'ブログサイトの管理者ページです',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const [isSelected, setIsSelected] = useState<number>(1);
	const handleClick = (buttonId: number) => {
		setIsSelected(buttonId);
	};

  return (
		<>
			<main>
				<aside className='fixed top-[72.5px] left-0 bottom-0 bg-gray-100 w-[280px]'>
					<Link href='/admin/posts' onClick={()=>handleClick(1)} className={`p-4 block hover:bg-blue-100 ${isSelected === 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>記事一覧</Link>
					<Link href='/admin/categories' onClick={()=>handleClick(2)} className={`p-4 block hover:bg-blue-100 ${isSelected === 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>カテゴリー一覧</Link>
				</aside>

        <div className='ml-[280px] p-4'>{children}</div>
			</main>
		</>
  );
}