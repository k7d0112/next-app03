'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '../_components/CategoryForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function Page() {
  const [name, setName] = useState<string>('');
  const router = useRouter();
  const { token } = useSupabaseSession();

  const handleSubmit = async(e: React.FormEvent) => {
    if(!token) return;

    e.preventDefault();

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    })

    const { id } = await res.json();
    router.push(`/admin/categories/${id}`);
    alert('カテゴリーを追加しました。');
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>カテゴリー作成</h1>
      <CategoryForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />
    </>
  );
}