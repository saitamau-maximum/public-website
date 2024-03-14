import Image from 'next/image';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { SiX, SiGithub } from 'react-icons/si';
import style from './Header.module.css';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href='/'>
          <Image
            src='/images/maximum-logo.png'
            alt='Maximum'
            width={167}
            height={42}
          />
        </Link>
      </div>
      <nav className={style.navigations}>
        <Link href='/about'>About</Link>
        <Link href='/news'>News</Link>
        <Link href='#'>Join</Link>
        <Link href='/achievements'>Achievements</Link>
        <Link href='/contact'>Contact</Link>
        <Link href='/faq'>Q&amp;A</Link>
        <Link
          href='https://blog.maximum.vc'
          target='_blank'
          rel='noopener noreferrer'
        >
          Blog
          <MdArrowOutward />
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiX size={24} />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiGithub size={24} />
        </Link>
      </nav>
    </header>
  );
}
