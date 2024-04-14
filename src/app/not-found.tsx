import type { Metadata } from 'next';
import Link from 'next/link';
import style from './not-found.module.scss';

export const metadata: Metadata = {
  title: '404 Not Found',
};

export default function Custom404() {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <div className={style.box}>
          <p className={style.text}>404 - Page Not Found</p>
          <p className={style.text}>お探しのページは見つかりませんでした</p>
          <Link href='/' className={style.link}>
            トップページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
