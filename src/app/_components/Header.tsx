import Link from 'next/link';

export default function Header () {
  return (
		<header className='p-6 bg-zinc-800 flex justify-between items-center'>
			<h1><Link href='/' className='text-white font-sans font-bold'>Blog</Link></h1>
			<Link href='/contact' className='text-white font-sans font-bold'>お問い合わせ</Link>
		</header>
	);
}