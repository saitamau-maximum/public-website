import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';

interface Props {
  params: { 
    id: string;
    slug: string
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), `docs`, `achievement`);
  const docs = await fs.readdir(docsDirectory);
  const params = [];
  for (const doc of docs) {
    params.push({ slug : doc.replace(/\.md$/, '') });
  }
  return params;
}

interface ResolvingMetadata {
  title: string;
  description: string;
}

export async function generateMetadata({ params }: Props): Promise<ResolvingMetadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'docs', 'achievement', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: data.title as string,
    description: data.description as string
  };
}

export default async function AchievementsSlug( { params } : Props ) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), `docs`, `achievement`, `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const html = await parseMarkdownToHTML(content);
  return(
    <div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html.content }} />
    </div>
  )
}