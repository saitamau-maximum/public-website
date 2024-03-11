import fs from 'fs/promises';
import path from 'path';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';
import matter from 'gray-matter';

interface Props {
  params: { 
    id: string;
    slug: string
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), `docs`, `news`);
  const docs = await fs.readdir(docsDirectory);
  return docs.map(doc => ({ slug: doc.replace(/\.md$/, '') }));
}

interface ResolvingMetadata {
  title: string;
  description: string;
}

export async function generateMetadata({ params }: Props): Promise<ResolvingMetadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'docs', 'news', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: data.title as string,
    description: data.description as string
  };
}

export default async function NewsDetail( { params } : Props ) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), `docs`, `news`, `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const html = await parseMarkdownToHTML(content);
  return(
    <main>
      <h1>{data.title}</h1>
      { /* 記事のタイトル等の動的コンテンツにXSSが発生する可能性が、信頼できるリソースからのみ提供されることとして許容する。 */ }
      <article dangerouslySetInnerHTML={{ __html: html.content }} />
    </main>
  )
}