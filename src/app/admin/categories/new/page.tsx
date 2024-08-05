'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '../_components/CategoryForm';

export default function Page() {
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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