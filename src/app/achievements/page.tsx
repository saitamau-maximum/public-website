import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Doc, getMarkdowns } from '../../utils/markdown';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

export default async function Achievements() {
  const docs: Doc[] = [];
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), "docs", "achievement");
  const getDocs = await getMarkdowns(docsDir);
  docs.push(...getDocs);

  // 一覧を日付でソート
  docs.sort((a, b) => (a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1));
  
  return (
    <div>
      <h1>Achievements</h1>
      {docs.map((doc) => (
        <div key={doc.slug}>
          <Link href={`/achievements/${doc.slug}`}>
            {doc.frontmatter.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
