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
          <p>About</p>
        </Link>
        <Link href='/news'>
          <p>News</p>
        </Link>
        <Link href='#'>
          <p>Join</p>
        </Link>
        <Link href='/achievements'>
          <p>Achievements</p>
        </Link>
        <Link href='/contact'>
          <p>Contact</p>
        </Link>
        <Link href='/faq'>
          <p>Q&A</p>
        </Link>
        <Link href='https://blog.maximum.vc'>
          <p>Blog↗</p>
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={xlogo.src} width={29} height={29} alt='X' />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={githublogo.src} width={29} height={29} alt='GitHub' />
        </Link>
      </nav>
    </header>
  );
}
