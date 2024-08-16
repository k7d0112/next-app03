'use client'

import Link from 'next/link';
import React from 'react'
import { useSupabaseSession } from '../_hooks/useSupabaseSession'
import { supabase } from '@/utils/supabase'

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

	const { session, isLoding } = useSupabaseSession();

	return (
		<header className='bg-gray-800 text-white p-6 font-bold flex justify-between items-center'>
			<Link href='/' className='header-link'>Blog</Link>
			{!isLoding && (
				<div className='flex items-center gap-4'>
					{session ? (
						<>
						  <Link href='/admin' className='header-link'>管理画面</Link>
							<button onClick={handleLogout}>ログアウト</button>
						</>
					) : (
						<>
						  <Link href='/contact' className='header-link'>お問い合わせ</Link>
							<Link href='/login' className='header-link'>ログイン</Link>
						</>
					)}
				</div>
			)}
		</header>
	);
}
// export default function Header () {
//   return (
// 		<header className='p-6 bg-zinc-800 flex justify-between items-center'>
// 			<h1><Link href='/' className='text-white font-sans font-bold'>Blog</Link></h1>
// 			<Link href='/contact' className='text-white font-sans font-bold'>お問い合わせ</Link>
// 		</header>
// 	);
// }