'use client'

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '../_component/PostForm';
import { Category } from '@/app/_types/Category';
import { Post } from '@/app/_types/Post';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
  const [title, setTitle] =useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        setIsLoading(true);
        const res = await fetch (`/api/admin/posts/${id}`, {
          headers: {
            'Content-Type':'application/json',
            Authorization: token,
          },
        });
        const { post }: { post: Post } = await res.json();
        setTitle(post.title);
        setContent(post.content);
        // setThumbnailUrl(post.thumbnailUrl);
        setCategories(post.postCategories.map((pc) => pc.category));
      } catch (error) {
        console.error('記事情報の取得中にエラーが発生しました:',error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  },[id, token]);

  if(isLoading) {
    return <div>読み込み中です...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch (`/api/admin/posts/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // thumbnailUrl以外
      body: JSON.stringify({ title, content, categories }),
    });
    alert('記事を更新しました');
  }

  const handleDelete = async () => {
    if(!confirm('記事を削除しますか？')) return

    await fetch (`/api/admin/posts/${id}`,{
      method: 'DELETE',
    });
    alert('記事を削除しました');
    router.push('/admin/posts');
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
      <h1 className='text-xl font-bold'>記事編集</h1>
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
        onDelete={handleDelete}
      />
    </>
  );
}