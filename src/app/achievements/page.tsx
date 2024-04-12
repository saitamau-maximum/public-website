import type { Metadata } from 'next';
import style from './list-styles.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';
import AchievementList from '@/components/achievement-list/achievement-list';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

export default async function Achievements() {
  return (
    <div className={style.main}>
      <div className={style.heroBox}>
        <HeroImage title='過去の実績' type='default' blur={true} />
        <Breadcrumb
          items={[
            { title: 'Top', href: '/' },
            { title: '過去の実績', href: '/achievements' },
          ]}
        />
      </div>
      <div className={style.container}>
        <h2 className={style.title}>参加した大会</h2>
        <AchievementList />
      </div>
    </div>
  );
}
