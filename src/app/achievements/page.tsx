import path from 'path';
import type { Metadata } from 'next';
import { Doc, getMarkdowns } from '../../utils/markdown';
import style from './list-styles.module.css';
import { HeroImage } from '@/components/HeroImage';
import AchievementList from '@/components/achievement-list/achievement-list';


export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

export default async function Achievements() {
  return (
    <div>
      <div className={style.heroBox}>
        <HeroImage title='過去の実績' type='default' blur={true} />
      </div>
      <div className={style.container}>
        <h2 className={style.title}>参加した大会</h2>
        <AchievementList />
      </div>
    </div>
  );
}
