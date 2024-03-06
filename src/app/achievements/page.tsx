import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

interface Doc {
  slug: string;
  content: string;
  frontmatter: {
    [key: string]: any;
  };
}

const getMarkdown = async (dir: string) => {
  const fileNames = fs.readdirSync(dir);
  const docs = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(dir, fileName);

      // ファイルの中身を取得
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // ファイル名からカテゴリを取得
      return {
        slug: fileName.replace(".md", ""),
        content,
        frontmatter: data,
      };
    })
  )
  return docs;
};

export default async function Achievements() {
  const docs: Doc[] = [];
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), "docs", "achievement");
  const getDocs = await getMarkdown(docsDir);
  docs.push(...getDocs.map((doc) => ({ ...doc })));

  // 一覧を日付でソート
  docs.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

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
