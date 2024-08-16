'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/app/_types/Category';
import { PostForm } from '../_component/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!token) return;

    e.preventDefault();

    const res = await fetch ('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ title, content, thumbnailImageKey, categories }),
    })

    const { id } = await res.json();
    router.push('/admin/posts');
    alert('記事を作成しました');
  }

  const handleImageChange = async (
    event: FormEvent<Element>,
  ): Promise<void> => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length == 0) {
      return;
    }

    const file = target.files[0];
    const filePath = `private/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from('post_thumbnail')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      alert(error.message);
      return;
    }

    setThumbnailImageKey(data.path);
  }

  return (
    <>
      <h1 className='text-xl font-bold'>記事作成</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        onChange={handleImageChange}
      />
    </>
  );
}