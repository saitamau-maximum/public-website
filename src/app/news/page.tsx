import path from 'path';
import Link from 'next/link';
import { getMarkdowns } from '../../utils/markdown';
import type { Metadata } from 'next';

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
    <div>
      <h1>News</h1>
      {docs.map((doc) => (
        <div key={doc.slug}>
          <Link href={`/news/${doc.slug}`}>
            {doc.frontmatter.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
