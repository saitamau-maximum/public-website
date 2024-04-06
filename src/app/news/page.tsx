import path from 'path';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { LinkCard } from '../../components/LinkCard';
import { getMarkdowns } from '../../utils/markdown';
import style from './page.module.scss';

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
          <div className={style.cardContainer}>
            {docs.map((doc) => (
              <LinkCard
                key={doc.slug}
                title={doc.frontmatter.title}
                content='AtCoder社の協力により◯年ぶりにMaximum主催の競技プログラミングコンテストを主催しました'
                date={doc.frontmatter.updatedAt.replace(/-/g, '/').slice(0, 7)}
                group={doc.frontmatter.group}
                to={`/news/${doc.slug}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
