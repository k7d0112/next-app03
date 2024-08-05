'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDateHyphen } from '@/app/_functions/formatDateHyphen';
import { formatDateSlash } from '@/app/_functions/formatDateSlash';

// type BlogPosts = {
//   id:number,
//   title:string,
//   content:string,
//   categories:string[],
//   createdAt:string,
//   thumbnailUrl:string,
// };

// type BlogProps = {
//   posts:BlogPosts[],
// };

// type MicroCmsPost = {
//   id: string
//   title: string
//   content: string
//   createdAt: string
//   categories: { id: string; name: string }[]
//   thumbnail: string
// };

type Post = {
  id: number,
  title: string,
  content:string,
  createdAt: string,
  postCategories: {id: number, name: string, }[],
}

type BlogProps = {
  posts:Post[],
};

function Blog ({posts}:BlogProps) {
  return (
    <>
      {posts.map((post:Post)=>{
        return (
          <li className='border border-slate-300 p-4 mb-8' key={post.id}>
            <Link href={`/blog_detail/${post.id}`}>
              <div className='flex justify-between items-center'>
                <time className='text-[12.8px] text-slate-400 font-sans' dateTime={formatDateHyphen(post.createdAt)}>{formatDateSlash(post.createdAt)}</time>
                <div>
                  {post.postCategories.map((category)=><span className='border border-[#0066cc] text-[12.8px] text-[#0066cc] font-sans rounded mr-2 py-[3.2px] px-[6.4px]' key={category.id}>{category.name}</span>)}
                </div>
              </div>
              <h1 className='mt-2 text-2xl text-zinc-800'>{post.title}</h1>
              <p className='mt-4 line-clamp-2'>{post.content}</p>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect (() => {
  //   const fetcher = async () => {
  //     try {
  //       const res = await fetch ('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
  //       const data = await res.json();
  //       // console.log(data);
  //       setPosts(data.posts);
  //     } catch(error) {
  //       console.error('記事取得中にエラーが発生しました：',error);
  //     } finally {
  //       setIsLoading (false);
  //     }
  //   }
  //   fetcher();
  // },[]);
  // useEffect(() => {
  //   const fetcher = async () => {
  //     try {
  //       const res = await fetch('https://ainow0ifew.microcms.io/api/v1/posts', {　// 管理画面で取得したエンドポイントを入力してください。
  //         headers: {　// fetch関数の第二引数にheadersを設定でき、その中にAPIキーを設定します。
  //           'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, // 管理画面で取得したAPIキーを入力してください。
  //         },
  //       })
  //       const { contents } = await res.json()
  //       setPosts(contents);
  //     } catch(error) {
  //       console.error('記事取得中にエラーが発生しました',error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetcher()
  // }, [])

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/posts');
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
    return <p>読み込み中です...</p>;
  }

  return (
    <main>
      <div className='w-[800px] mx-auto py-4 mt-10'>
        <ul>
          <Blog posts={posts} />
        </ul>
      </div>
    </main>
  );
}
