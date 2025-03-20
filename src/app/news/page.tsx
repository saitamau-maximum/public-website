import path from 'path';
import { Metadata } from 'next';
import { getMarkdowns } from '../../utils/markdown';
import style from './page.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';
import { NewsPageList } from '@/components/news-page-list/news-page-list';

export const metadata: Metadata = {
  title: 'ニュース一覧',
  description:
    '埼玉大学プログラミングサークル「Maximum」に関する様々なお知らせを配信しています。',
};

export default async function News() {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'news');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return (
    <div className={style.container}>
      <main className={style.main}>
        <div className={style.hero}>
          <HeroImage type='default' title='ニュース一覧' blur={true} />
          <Breadcrumb
            items={[
              { title: 'Top', href: '/' },
              { title: 'ニュース一覧', href: '/news' },
            ]}
          />
        </div>
        <div className={style.contents}>
          <NewsPageList />
        </div>
      </main>
    </div>
  );
}
