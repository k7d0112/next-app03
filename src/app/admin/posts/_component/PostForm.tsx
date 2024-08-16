import { Category } from '@/app/_types/Category';
import React from 'react';
import { useState, useEffect } from 'react';
import { CategoriesSelect } from './CategoriesSelect';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';

type Props = {
  title: string,
  setTitle: (title: string) => void,
  content: string,
  setContent: (content: string) => void,
  thumbnailImageKey: string,
  setThumbnailImageKey: (thumbnailImageKey: string) => void,
  categories: Category[],
  setCategories: (categories: Category[]) => void,
  onSubmit: (e: React.FormEvent) => void,
  onChange: (e: React.FormEvent) => void,
  onDelete?: () => void,
};

export const PostForm: React.FC<Props> = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailImageKey,
  setThumbnailImageKey,
  categories,
  setCategories,
  onSubmit,
  onChange,
  onDelete,
}) => {
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null,);

  useEffect(() => {
    if(!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
      .from('post_thumbnail')
      .getPublicUrl(thumbnailImageKey)

      setThumbnailImageUrl(publicUrl);
    }

    fetcher();
  }, [thumbnailImageKey]);

  return (
    <form className='mt-8' onSubmit={onSubmit}>
      <dl>
        <div>
          <dt><label htmlFor="title">タイトル</label></dt>
          <dd><input type="text" id='title' name='title' className='p-3 border border-gray-300 rounded w-full' value={title} onChange={(e) => setTitle(e.target.value)}/></dd>
        </div>
        <div className='mt-4'>
          <dt><label htmlFor="content">内容</label></dt>
          <dd><textarea name="content" id="content" rows={2} className='p-3 border border-gray-300 rounded w-full resize-none' value={content} onChange={(e) => setContent(e.target.value)}></textarea></dd>
        </div>
        <div className='mt-4'>
          <dt><label htmlFor="thumbnailImageKey">サムネイルURL</label></dt>
          <dd><input type="file" id='thumbnailImageKey' className='p-3 border border-gray-300 rounded w-full' onChange={onChange} accept='image/*' /></dd>
          {thumbnailImageUrl && (
            <div className='mt-2'>
              <Image src={thumbnailImageUrl} alt='thumbnail' width={400} height={400} />
            </div>
          )}
        </div>
        <div className='mt-4'>
          <dt><label htmlFor="categories">カテゴリー</label></dt>
          <dd>
            <CategoriesSelect
              selectedCategories={categories}
              setSelectedCategories={setCategories}
            />
          </dd>
        </div>
      </dl>
      <button type='submit' className='py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-sm font-medium text-white mt-4'>
        {onDelete ? '作成' : '更新'}
      </button>
      {onDelete && (
        <button type='button' onClick={onDelete} className='py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-sm font-medium text-white mt-4 ml-2'>
          削除
        </button>
      )}
    </form>
  );
}