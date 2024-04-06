import path from 'path';
import { LinkCard } from '../LinkCard';
import style from './news-page-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';
import Link from 'next/link';

export async function NewsPageList() {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'news');
  const docs = await getMarkdowns(docsDir);

  if (docs.length === 0) {
    return (
      <div className={style.isEmpty}>
        <p>新着記事がありません</p>
        <Link href='/'>Topへ戻る</Link>
      </div>
    );
  }
  
  return (
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
  );
}
