import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { getMarkdowns } from '../../utils/markdown';
import style from './page.module.scss';
import { NewsPageList } from '@/components/news-page-list';

export const metadata: Metadata = {
  title: 'News',
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
          <img src='/images/hero.png' alt='Hero' className={style.heroImage} />
          <div className={style.breadcrumb}>
            <Link href='/' className={style.breadcrumbLink}>
              Top
            </Link>
            <p className={style.breadcrumbLink}>&nbsp;&gt;&nbsp;</p>
            <Link href='/news' className={style.breadcrumbLink}>
              News
            </Link>
          </div>
        </div>
        <div className={style.contents}>
          <h1 className={style.contentTitle}>新着情報</h1>
          <NewsPageList />
        </div>
      </main>
    </div>
  );
}
