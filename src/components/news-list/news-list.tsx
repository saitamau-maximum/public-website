import path from 'path';
import Card from '../Card';
import style from './news-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

export async function NewsList() {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'test');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  // 記事が存在するなら上位3件に絞り、存在しないなら記事がない旨を表示
  docs.length ? docs.slice(0, 3) : docs;
  if (docs.length === 0) {
    console.log('記事がありません');
    return <p>記事がありません</p>;
  }

  return (
    <div>
      {docs.map((doc) => (
        <div key={doc.slug} className={style.newsItem}>
          <Card
            title={doc.frontmatter.title}
            content={doc.frontmatter.description}
            date={new Date(doc.frontmatter.updatedAt).toLocaleDateString()}
            group={doc.frontmatter.group}
            to={`/achievements/${doc.slug}`}
            imageSrc={doc.frontmatter.image}
            imageAlt={doc.frontmatter.title}
            style={{ width: '348px' }}
          />
        </div>
      ))}
    </div>
  );
}
