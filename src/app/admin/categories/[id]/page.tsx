'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CategoryForm } from '../_components/CategoryForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function Page() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!token) return;

    e.preventDefault();

    await fetch (`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    })
    alert ('カテゴリーを更新しました');
  }

  const handleDelete = async () => {
    if(!confirm('カテゴリーを削除しますか？')) return

    await fetch (`/api/admin/categories/${id}`, {
      method: 'DELETE',
    });
    alert('カテゴリーを削除しました。');
    router.push('/admin/categories');
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch (`/api/admin/categories/${id}`);
      const { category } = await res.json();
      setName(category.name);
    }
    fetcher();
  }, [id]);

  return (
    <>
      <h1 className='text-2xl font-bold'>カテゴリー編集</h1>
      <CategoryForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
}