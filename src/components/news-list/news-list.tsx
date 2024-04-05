import path from 'path';
import Card from '../NewsCard';
import style from './news-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

export async function NewsList() {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'news');
  const docs = await getMarkdowns(docsDir);

  // frontmatterの未記入の項目をファイルごとに取得
  const frontmatterKeys = ['description', 'group', 'updatedAt', 'title'];
  const errorDocs = docs.filter(
    (doc) =>
      !frontmatterKeys.every(
        (key) => doc.frontmatter[key as keyof typeof doc.frontmatter],
      ),
  );

  // 未記入の項目がある場合はエラーを投げる
  if (errorDocs.length > 0) {
    const undefinedKeys = errorDocs.map((doc) =>
      frontmatterKeys.filter(
        (key) => !doc.frontmatter[key as keyof typeof doc.frontmatter],
      ),
    );
    throw new Error(
      `frontmatterに未記入の項目があります: ${errorDocs.map((doc, i) => `${doc.slug}(${undefinedKeys[i].join(', ')})`)}`,
    );
  }

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  // 記事が存在するなら上位3件に絞り、存在しないなら記事がない旨を表示
  if (docs.length === 0) {
    return <p className={style.newsEmpty}>新着情報はありません</p>;
  }

  // 上位3件を取得
  const topDocs = docs.slice(0, 3);

  return (
    <div className={style.newsList}>
      {topDocs.map((topDocs) => (
        <div key={topDocs.slug} className={style.newsItem}>
          <Card
            title={topDocs.frontmatter.title}
            content={topDocs.frontmatter.description}
            date={new Date(topDocs.frontmatter.updatedAt).toLocaleDateString()}
            group={topDocs.frontmatter.group}
            to={`/news/${topDocs.slug}`}
            imageSrc={topDocs.frontmatter.image}
            imageAlt={topDocs.frontmatter.title}
          />
        </div>
      ))}
    </div>
  );
}
