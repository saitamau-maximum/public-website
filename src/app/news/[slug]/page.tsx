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

// newsの中身が無かった場合の処理
export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), `docs`, `news`);
  const docs = await fs.readdir(docsDirectory);
  const paths = docs.map((doc) => ({
    params: { slug: doc.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
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

export default async function NewsDetail({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), `docs`, `news`, `${slug}.md`);
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
