import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import style from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';
import { MediaLinkCard } from '@/components/MediaLinkCard';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    '埼玉大学プログラミングサークル「Maximum」へのお問い合わせのページです。',
};

export default function Contact() {
  return (
    <div className={style.container}>
      <div className={style.hero}>
        <HeroImage title='お問い合わせ' type='default' blur={true} />
        <Breadcrumb
          items={[
            { href: '/', title: 'Top' },
            { href: '/contact', title: 'お問い合わせ' },
          ]}
        />
      </div>
      <main className={style.main}>
        <div className={style.contents}>
          <p className={style.text}>
            ただいまお問い合わせフォームの準備中です。
          </p>
          <p className={style.text}>
            お手数ですが、お問い合わせは
            <span className={style.bold}>Maximum公式X(Twitter)</span>
            のDMにお寄せください。
          </p>
          <div className={style.mediaContainer}>
            <MediaLinkCard
              title='Maximum 公式X(Twitter)'
              id='@maximum03400346'
              imageUrl='/logos/Maximum-icon.svg'
              imageAlt='Twitter'
            />
          </div>
        </div>
      </main>
    </div>
  );
}
