import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Doc, getMarkdowns } from '../../utils/markdown';
import style from './list-styles.module.css';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

export default async function Achievements() {
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'achievement');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return (
    <div>
      <div>
        <h1>過去の実績</h1>
        <h2>参加した大会</h2>
          {docs.map((doc) => (
            <div key={doc.slug} className={style.box}>
              <img src={doc.frontmatter.imageUrl} alt={doc.frontmatter.title}/>
              <div>
                <h3>{doc.frontmatter.title}</h3>
                <p>{doc.frontmatter.subtitle}</p>
                <p>{doc.frontmatter.description}</p>
                <Link href={`/achievements/${doc.slug}`}>成績を見る→</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
