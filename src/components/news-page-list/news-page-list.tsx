import path from 'path';
import Link from 'next/link';
import { NewsLinkCard } from '../NewsLinkCard';
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

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return (
    <div className={style.cardContainer}>
      {docs.map((doc) => (
        <NewsLinkCard
          key={doc.slug}
          title={doc.frontmatter.title}
          content={doc.frontmatter.description}
          date={new Date(doc.frontmatter.updatedAt).toLocaleDateString(
            'ja-JP',
            { year: 'numeric', month: '2-digit' },
          )}
          group={doc.frontmatter.group}
          to={`/news/${doc.slug}`}
        />
      ))}
    </div>
  );
}
