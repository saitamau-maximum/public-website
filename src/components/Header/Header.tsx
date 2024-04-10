'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { SiX, SiGithub } from 'react-icons/si';
import style from './Header.module.scss';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header
      className={clsx(style.header, {
        [style.headerMenuOpen]: isMenuOpen,
      })}
    >
      <div className={style.logo}>
        <Link href='/'>
          <img
            src='/logos/Maximum-logo.svg'
            alt='Maximum'
            width={167}
            height={42}
          />
        </Link>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={style.menuButton}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className={style.menuButtonLines}></span>
        <span className={style.menuButtonLines}></span>
        <span className={style.menuButtonLines}></span>
      </button>
      <nav className={style.navigations}>
        <div className={style.navigationLinks}>
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
        </div>
        <div className={style.navigationIcons}>
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
        </div>
      </nav>
    </header>
  );
}
