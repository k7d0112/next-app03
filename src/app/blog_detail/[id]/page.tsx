'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type BlogPost = {
  id:number,
  title:string,
  content:string,
  categories:string[],
  createdAt:string,
  thumbnailUrl:string,
};

export default function BlogDetail () {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formatDateHyphen = (dataString:string) => {
    const date = new Date(dataString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  const formatDateSlash = (dataString:string) => {
    const date = new Date(dataString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }

  useEffect (() => {
    const fetcher = async () => {
      try {
        const res = await fetch (`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error('記事取得中にエラーが発生しました：',error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  },[id]);

  if (isLoading) {
    return <p>読み込み中です...</p>
  }

  return (
    <div className='max-w-[800px] mx-auto py-4 mt-10'>
      <Image src={post.thumbnailUrl} alt={`${post.title}の画像`} width={800} height={400}/>
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <time className='text-[12.8px] text-slate-400 font-sans' dateTime={formatDateHyphen(post.createdAt)}>{formatDateSlash(post.createdAt)}</time>
          <div>
            {post.categories.map((category,index)=><span className='text-[#06c] text-[12.8px] font-sans border border-[#06c] rounded py-[3.2px] px-[6.4px] mr-2' key={index}>{category}</span>)}
          </div>
        </div>
        <h1 className='font-sans text-2xl mt-2'>{post.title}</h1>
        <p className='font-sans mt-4'>{post.content}</p>
      </div>
    </div>
  );
}