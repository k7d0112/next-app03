'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/app/types/Category';
import { CategoriesSelect } from '../_component/CategoriesSelect';
import { PostForm } from '../_component/PostForm';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('https://placehold.jp/800x400.png');
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch ('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    })

    const { id } = await res.json();
    router.push('/admin/posts');
    alert('記事を作成しました');
  }

  return (
    <>
      <h1 className='text-xl font-bold'>記事作成</h1>
      <PostForm
        mode='new'
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
      />
    </>
  );
}