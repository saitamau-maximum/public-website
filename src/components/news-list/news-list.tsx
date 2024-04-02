import path from 'path';
import Card from '../Card';
import style from './news-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

export async function NewsList() {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'achievement');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  // 記事が存在するなら上位3件に絞り、存在しないなら記事がない旨を表示
  docs.splice(3);
  if (docs.length === 0) {
    return <p className={style.newsEmpty}>新着情報はありません</p>;
  }

  return (
    <div className={style.newsList}>
      {docs.map((doc) => (
        <div key={doc.slug} className={style.newsItem}>
          <Card
            title={doc.frontmatter.title}
            content={doc.frontmatter.description}
            date={new Date(doc.frontmatter.updatedAt).toLocaleDateString()}
            group={doc.frontmatter.group}
            to={`/news/${doc.slug}`}
            imageSrc={doc.frontmatter.image}
            imageAlt={doc.frontmatter.title}
          />
        </div>
      ))}
    </div>
  );
}
