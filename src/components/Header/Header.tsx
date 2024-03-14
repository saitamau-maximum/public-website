import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { SiX, SiGithub } from 'react-icons/si';
import style from './Header.module.scss';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href='/'>
          <img src='/logos/Maximum-logo.svg' alt='Maximum' width={167} height={42} />
        </Link>
      </div>
      <nav className={style.navigations}>
        <Link href='/about' className={style.navigationLink}>About</Link>
        <Link href='/news' className={style.navigationLink}>News</Link>
        <Link href='#' className={style.navigationLink}>Join</Link>
        <Link href='/achievements' className={style.navigationLink}>Achievements</Link>
        <Link href='/contact' className={style.navigationLink}>Contact</Link>
        <Link href='/faq' className={style.navigationLink}>Q&amp;A</Link>
        <Link
          href='https://blog.maximum.vc'
          target='_blank'
          rel='noopener noreferrer'
          className={style.navigationLink}
        >
          Blog
          <MdArrowOutward />
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
          className={style.navigationLink}
        >
          <SiX size={24} />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
          className={style.navigationLink}
        >
          <SiGithub size={24} />
        </Link>
      </nav>
    </header>
  );
}
