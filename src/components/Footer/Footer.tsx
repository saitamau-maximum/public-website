import clsx from 'clsx';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { SiX, SiGithub } from 'react-icons/si';
import { LinkButton } from '../LinkButton/LinkButton';
import style from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link href='/'>
            <img
              src='/logos/Maximum-logo-white.svg'
              alt='Maximum'
              width={334}
              height={84}
            />
          </Link>
        </div>
        <div className={style.navigationsForPC}>
          <LinkButton href='/join' variant='green' size='medium'>
            入会案内はこちら
          </LinkButton>
        </div>
        <div className={style.navigationsForMobile}>
          <LinkButton href='/join' variant='green' size='small'>
            入会案内はこちら
          </LinkButton>
        </div>
      </div>

      <nav className={style.navigations}>
        <Link href='/about' className={style.navigationLink}>
          About
        </Link>
        <Link href='/news' className={style.navigationLink}>
          News
        </Link>
        <Link href='#' className={style.navigationLink}>
          Join
        </Link>
        <Link href='/achievements' className={style.navigationLink}>
          Achievements
        </Link>
        <Link href='/contact' className={style.navigationLink}>
          Contact
        </Link>
        <Link href='/faq' className={style.navigationLink}>
          Q&amp;A
        </Link>
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
          className={clsx(style.navigationLink, style.navigationsForMobile)}
        >
          X
          <MdArrowOutward />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
          className={clsx(style.navigationLink, style.navigationsForMobile)}
        >
          GitHub
          <MdArrowOutward />
        </Link>
        <Link
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
          className={clsx(style.navigationLink, style.navigationsForPC)}
        >
          <SiX size={24} />
        </Link>
        <Link
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
          className={clsx(style.navigationLink, style.navigationsForPC)}
        >
          <SiGithub size={24} />
        </Link>
      </nav>
    </footer>
  );
}
