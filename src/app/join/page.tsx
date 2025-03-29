import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import style from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';

export const metadata: Metadata = {
  title: '入会案内',
  description:
    '埼玉大学プログラミングサークル「Maximum」への入会案内のページです。',
};

export default async function Join() {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <div className={style.hero}>
          <HeroImage title='入会の流れ' type='default' blur={true} />
          <Breadcrumb
            items={[
              { href: '/', title: 'Top' },
              { href: '/join', title: '入会案内' },
            ]}
          />
        </div>
        <div className={style.contents}>
          <span className={style.contentTitle}>入会の流れ</span>
          <div className={style.frame}>
            <p className={style.text}>
              <span className={style.bold}>
                <Link
                  href='https://twitter.com/Maximum03400346'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={clsx(style.bold, style.span)}
                >
                  公式X(Twitter)
                  <MdArrowOutward />
                </Link>
                のDM
              </span>
              または
              <Link
                href='https://line.me/ti/g2/uLfSQMqkPI0NKLrWZ0nDs0d6wXZEJPe4wzSjFw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default'
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(style.bold, style.span)}
              >
                公式OpenChat
                <MdArrowOutward />
              </Link>
              で入会希望を伝える
            </p>
            <div className={style.triangle} />
            <p className={style.text}>
              <Link
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(style.bold, style.span)}
              >
                GitHub
                <MdArrowOutward />
              </Link>
              アカウントを新規作成またはログイン
            </p>
            <div className={style.triangle} />
            <p className={style.text}>
              メンバーより発行される招待リンクで、
              <Link
                href='https://id.maximum.vc'
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(style.bold, style.span)}
              >
                ポータルサイト
                <MdArrowOutward />
              </Link>
              に仮登録をする
            </p>
            <div className={style.triangle} />
            <p className={style.text}>
              サークル費の入金を行い、本登録を完了する
            </p>
          </div>
          <p className={style.subtext}>
            学位・学部問わず
            <span className={clsx(style.bold, style.text)}>
              埼玉大学に所属していれば
            </span>
            どなたでも参加できます！
          </p>
        </div>
      </main>
    </div>
  );
}
