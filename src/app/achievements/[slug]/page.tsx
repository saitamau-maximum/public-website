import fs from 'fs/promises';
import path from 'path';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';
import matter from 'gray-matter';
import { Metadata } from 'next';
import style from './slug-styles.module.css'

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
  const filePath = path.join(
    process.cwd(),
    `docs`,
    `achievement`,
    `${slug}.md`,
  );
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
      <div className={style.heroBox}>
        <h1 className={style.heroText}>過去の実績</h1>
        <img className={style.heroImage} src='/heros/hero.png' />
      </div>
      <div className={style.container}>
        <div className={style.box}>
          <img/>
          <h2 className={style.title}>{data.title}</h2>
          <hr className={style.line}/>
          {/* 記事のタイトル等の動的コンテンツにXSSが発生する可能性が、信頼できるリソースからのみ提供されることとして許容する。 */}
          <article dangerouslySetInnerHTML={{ __html: html.content }} />
        </div>
      </div>
    </main>
  );
}
