'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Category } from '@/app/_types/Category';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function Page () {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      const res = await fetch ('/api/admin/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const { categories } = await res.json();
      setCategories(categories);
    }
    fetcher();
  },[token]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>カテゴリー一覧</h1>
        <Link href='/admin/categories/new' className='inline-block py-2 px-4 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded'>新規作成</Link>
      </div>
      <ul className='mt-8'>
        {categories.map((category) => {
          return (
            <li key={category.id} className='border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer'>
              <Link href={`/admin/categories/${category.id}`}>{category.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}