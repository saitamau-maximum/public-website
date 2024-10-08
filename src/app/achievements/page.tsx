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
        <h2 className={style.title}>保有資格</h2>
        <div className={style.content}>
          <p>
            当サークルの部員が現在保有している資格について記載します。(2024年9月時点)
          </p>

          <table>
            <thead>
              <tr>
                <th>資格名</th>
                <th>保有人数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>情報処理安全確保支援士（登録セキスペ）</td>
                <td>1名</td>
              </tr>
              <tr>
                <td>応用情報技術者</td>
                <td>7名</td>
              </tr>
              <tr>
                <td>基本情報技術者</td>
                <td>3名</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
