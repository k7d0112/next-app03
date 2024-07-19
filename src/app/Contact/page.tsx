'use client'

import { useState,FormEvent } from 'react';

export default function Contact () {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [errors, setErrors] = useState<{[keys:string]:string}>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = () => {
    const errors:{[keys:string]:string} = {};
    if (!name) {
      errors.name = '名前は入力必須です';
    } else if (name.length>30) {
        errors.name = '名前は30文字以内で入力してください';
    }
    if (!email) {
        errors.email = 'メールアドレスは入力必須です';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = '有効なメールアドレスを入力してください';
    }
    if (!contents) {
        errors.contents = '本文が入力必須です';
    } else if (contents.length>500){
        errors.contents = '本文は500文字以内で入力してください';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await sendForm({name, email, contents});
      alert('送信完了しました')
      setName('');
      setEmail('');
      setContents('');
    } catch(error){
      alert('送信に失敗しました。再度お試しください。');
    } setIsSubmitting(false);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setContents('');
    setErrors({});
  };

  type formDate = {
    name:string,
    email:string,
    contents:string,
  };

  const sendForm = async (formDate:formDate) => {
    try {
      const response = await fetch ('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(formDate)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation', error);
    }
  };

  return (
    <div className='max-w-[800px] mx-auto py-4 mt-10'>
      <h1 className='font-bold text-2xl'>問合わせフォーム</h1>
      <form className='mt-10' onSubmit={handleSubmit}>
        <dl>
          <div className='flex justify-between items-center'>
            <dt className='w-[240px]'><label htmlFor='name'>お名前</label></dt>
            <dd className='w-full'><input type='text' id='name' name='name' required className='w-full border border-slate-300 rounded-lg p-4' value={name} onChange={(e)=>setName(e.target.value)} disabled={isSubmitting}/></dd>
          </div>
          { errors.name && <p className='text-red-600'>{errors.name}</p> }
          <div className='flex justify-between items-center mt-6'>
            <dt className='w-[240px]'><label htmlFor='email'>メールアドレス</label></dt>
            <dd className='w-full'><input type='text' id='email' name='email' required className='w-full border border-slate-300 rounded-lg p-4' value={email} onChange={(e)=>setEmail(e.target.value)} disabled={isSubmitting} /></dd>
          </div>
          { errors.email && <p className='text-red-600'>{errors.email}</p> }
          <div className='flex justify-between items-center mt-6'>
            <dt className='w-[240px]'><label htmlFor='contents'>本文</label></dt>
            <dd className='w-full'><textarea id='contents' name='contents' required rows={8} className='w-full border border-slate-300 rounded-lg p-4' value={contents} onChange={(e)=>setContents(e.target.value)} disabled={isSubmitting}></textarea></dd>
          </div>
          { errors.contents && <p className='text-red-600'>{errors.contents}</p> }
        </dl>
        <div className='flex justify-center items-center mt-10'>
          <button type='submit' className='bg-gray-800 font-bold text-white py-2 px-4 rounded-lg' disabled={isSubmitting}>送信</button>
          <button className='bg-gray-200 font-bold rounded-lg py-2 px-4 ml-4' onClick={handleClear} disabled={isSubmitting}>クリア</button>
        </div>
      </form>
    </div>
  );
}