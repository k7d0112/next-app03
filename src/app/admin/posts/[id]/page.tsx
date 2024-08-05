'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '../_component/PostForm';
import { Category } from '@/app/types/Category';
import { Post } from '@/app/types/post';

export default function Page() {
  const [title, setTitle] =useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const res = await fetch (`/api/admin/posts/${id}`);
        const { post }: { post: Post } = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setThumbnailUrl(post.thumbnailUrl);
        setCategories(post.postCategories.map((pc) => pc.category));
      } catch (error) {
        console.error('記事情報の取得中にエラーが発生しました:',error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  },[id]);

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
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
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

  return (
    <>
      <h1 className='text-xl font-bold'>記事編集</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
}