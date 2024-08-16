'use client'

import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/_components/Button';
import { Input } from '@/app/_components/input';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('ログインに失敗しました。');
    } else {
      router.replace('/admin/posts');
    }
  }

  return (
    <div className='flex justify-center pt-[240px]'>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-[400px]'>
        <div>
          <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>メールアドレス</label>
          <Input type={email} name={email} id={email} placeholder={'name@company.com'} onChange={(e) => setEmail(e.target.value)} />
          {/* <input type="email" name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5' required placeholder='name@company.com' onChange={(e) => setEmail(e.target.value)} /> */}
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>パスワード</label>
          <Input type={password} name={password} id={password} placeholder={'・・・・・・・'} onChange={(e) => setPassword(e.target.value)} />
          {/* <input type='password' name='password' id='password' placeholder='・・・・・・' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus: border-blue-500 block w-full p-2.5' required onChange={(e) => setPassword(e.target.value)} /> */}
        </div>

        <div>
          <Button menu={'ログイン'} />
        </div>
      </form>
    </div>
  )
}