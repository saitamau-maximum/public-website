import Link from 'next/link';
import maximumlogo from '../../../public/logos/Maximum-logo.svg';
import githublogo from '../../../public/logos/github-logo-white.svg';
import xlogo from '../../../public/logos/x-logo-white.svg';
import style from './Header.module.css';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={maximumlogo.src} width={167} height={42} alt='Maximum' />
      </div>
      <nav className={style.navigations}>
        <Link href='/about'>
          <a>About</a>
        </Link>
        <Link href='/news'>
          <a>News</a>
        </Link>
        <Link href='#'>
          <a>Join</a>
        </Link>
        <Link href='/achievements'>
          <a>Achievements</a>
        </Link>
        <Link href='/contact'>
          <a>Contact</a>
        </Link>
        <Link href='/faq'>
          <a>Q&A</a>
        </Link>
        <Link href='https://blog.maximum.vc'>
          <a>Blog↗</a>
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={xlogo.src} width={24} height={24} alt='X' />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={githublogo.src} width={24} height={24} alt='GitHub' />
        </Link>
      </nav>
    </header>
  );
}
