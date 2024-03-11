import fs from 'fs/promises';
import path from 'path';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';
import matter from 'gray-matter';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), `docs`, `achievement`);
  const docs = await fs.readdir(docsDirectory);
  const params = [];
  for (const doc of docs) {
    params.push({ slug: doc.replace(/\.md$/, '') });
  }
  return params;
}

interface ResolvingMetadata {
  title: string;
  description: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), `docs`, `news`, `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function AchievementsDetail({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    `docs`,
    `achievement`,
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const html = await parseMarkdownToHTML(content);
  return (
    <main>
      <h1>{data.title}</h1>
      {/* 記事のタイトル等の動的コンテンツにXSSが発生する可能性が、信頼できるリソースからのみ提供されることとして許容する。 */}
      <article dangerouslySetInnerHTML={{ __html: html.content }} />
    </main>
  );
}
