import { Category } from '@/app/types/Category';
import React from 'react';
import { CategoriesSelect } from './CategoriesSelect';

type Props = {
  title: string,
  setTitle: (title: string) => void,
  content: string,
  setContent: (content: string) => void,
  thumbnailUrl: string,
  setThumbnailUrl: (thumbnailUrl: string) => void,
  categories: Category[],
  setCategories: (categories: Category[]) => void,
  onSubmit: (e: React.FormEvent) => void,
  onDelete?: () => void,
};

export const PostForm: React.FC<Props> = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
}) => {
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
          <dt><label htmlFor="thumbnailUrl">サムネイルURL</label></dt>
          <dd><input type="text" id='thumbnailUrl' name='thumbnailUrl' className='p-3 border border-gray-300 rounded w-full' value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)}/></dd>
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