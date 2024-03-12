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
        <a href='/about'>
          <a>About</a>
        </a>
        <a href='/news'>
          <a>News</a>
        </a>
        <a href='#'>
          <a>Join</a>
        </a>
        <a href='/achievements'>
          <a>Achievements</a>
        </a>
        <a href='/contact'>
          <a>Contact</a>
        </a>
        <a href='/faq'>
          <a>Q&A</a>
        </a>
        <a href='https://blog.maximum.vc'>
          <a>Blog↗</a>
        </a>
        <a
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={xlogo.src} width={29} height={29} alt='X' />
        </a>
        <a
          href='https://github.com/saitamau-maximum'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={githublogo.src} width={29} height={29} alt='GitHub' />
        </a>
      </nav>
    </header>
  );
}
