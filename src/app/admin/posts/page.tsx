'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Post } from '@/app/types/post';
import { formatDateHyphen } from '@/app/_functions/formatDateHyphen';
import { formatDateSlash } from '@/app/_functions/formatDateSlash';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/admin/posts');
        const { posts } = await res.json();
        setPosts(posts);
      } catch (error) {
        console.error('記事取得中にエラーが発生しました:',error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  },[]);

  if(isLoading) {
    return <p>読み込み中です...</p>
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>記事一覧</h1>
        <Link href='/admin/posts/new' className='inline-block py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white font-bold'>新規作成</Link>
      </div>
      <ul className='mt-8'>
        {posts.map((post)=>{
          return (
            <li key={post.id} className='border-b border-gray-300 p-4 hover:bg-gray-100 cursor-pointer'>
              <Link href={`/admin/posts/${post.id}`}>
                <h2 className='font-bold text-xl'>{post.title}</h2>
                <time dateTime={formatDateHyphen(post.createdAt)} className='text-gray-500'>{formatDateSlash(post.createdAt)}</time>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}