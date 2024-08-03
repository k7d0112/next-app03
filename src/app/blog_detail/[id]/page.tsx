'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

// type MicroCmsPost = {
//   id: string
//   title: string
//   content: string
//   createdAt: string
//   categories: { id: string; name: string }[]
//   thumbnail: { url: string; height: number; width: number }
// };

type Post = {
  id: number,
  title: string,
  content:string,
  createdAt: string,
  thumbnailUrl: string,
  postCategories: {id: number, name:string}[],
};

export default function BlogDetail () {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
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
        const res = await fetch (`api/posts/${id}`);
        const { post } = await res.json();
        setPost(post);
      } catch (error) {
        console.error('記事取得中にエラーが発生しました：',error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  },[id]);

  // const res = await fetch (`https://ainow0ifew.microcms.io/api/v1/posts/${id}`,
  //   {
  //     headers:{
  //       'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
  //     },
  //   },
  // );
  // const data = await res.json();
  // setPost(data);

  if (isLoading) {
    return <p>読み込み中です...</p>
  }

  if (!post) {
    return <p>記事が見つかりません</p>
  }

  return (
    <div className='max-w-[800px] mx-auto py-4 mt-10'>
      {/* {post.thumbnailUrl && <Image src={post.thumbnailUrl} alt={`${post.title}の画像`} width={800} height={400}/>} */}
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <time className='text-[12.8px] text-slate-400 font-sans' dateTime={formatDateHyphen(post.createdAt)}>{formatDateSlash(post.createdAt)}</time>
          <div>
            {post.postCategories.map((category)=><span className='text-[#06c] text-[12.8px] font-sans border border-[#06c] rounded py-[3.2px] px-[6.4px] mr-2' key={category.id}>{category.name}</span>)}
          </div>
        </div>
        <h1 className='font-sans text-2xl mt-2'>{post.title}</h1>
        <p className='font-sans mt-4'>{post.content}</p>
      </div>
    </div>
  );
}