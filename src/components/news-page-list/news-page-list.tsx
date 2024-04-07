import path from 'path';
import Link from 'next/link';
import { LinkCard } from '../LinkCard';
import style from './news-page-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

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
          content={doc.frontmatter.description}
          date={new Date(doc.frontmatter.updatedAt).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit"})}
          group={doc.frontmatter.group}
          to={`/news/${doc.slug}`}
        />
      ))}
    </div>
  );
}
