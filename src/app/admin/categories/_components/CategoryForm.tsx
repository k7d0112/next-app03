import React from 'react';

type Props = {
  name: string,
  setName: (name: string) => void,
  onSubmit: (e: React.FormEvent) => void,
  onDelete?: () => void,
};

export const CategoryForm: React.FC<Props> = ({
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  return (
    <form className='mt-4' onSubmit={onSubmit}>
      <dl>
        <div>
          <dt><label htmlFor="name">カテゴリー名</label></dt>
          <dd><input type="text" id='name' name='name' className='p-3 border border-gray-300 rounded w-full' value={name} onChange={(e)=>{setName(e.target.value)}} /></dd>
        </div>
      </dl>
      <button type='submit' className='py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium mt-4'>
        {onDelete ? '作成' : '更新'}
      </button>
      {onDelete && (
        <button type='button' onClick={onDelete} className='py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-sm text-white font-medium mt-4 ml-2'>
          削除
        </button>
      )}
    </form>
  );
}