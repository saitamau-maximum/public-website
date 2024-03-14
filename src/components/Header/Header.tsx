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
        <Link href='/about'>
          <span>About</span>
        </Link>
        <Link href='/news'>
          <span>News</span>
        </Link>
        <Link href='#'>
          <span>Join</span>
        </Link>
        <Link href='/achievements'>
          <span>Achievements</span>
        </Link>
        <Link href='/contact'>
          <span>Contact</span>
        </Link>
        <Link href='/faq'>
          <span>Q&amp;A</span>
        </Link>
        <Link href='https://blog.maximum.vc'>
          <span>Blog<MdArrowOutward /></span>
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiX size={28} />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiGithub size={28} />
        </Link>
      </nav>
    </header>
  );
}
