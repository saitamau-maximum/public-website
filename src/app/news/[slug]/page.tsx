import fs from 'fs/promises';
import path from 'path';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';
import matter from 'gray-matter';
import { Metadata } from 'next';
import style from './style.module.scss';
import { Article } from '@/components/Article';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';
import Toc from '@/components/Toc';

interface Props {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), `docs`, `news`);
  const docs = await fs.readdir(docsDirectory);
  return docs.map((doc) => ({ slug: doc.replace(/\.md$/, '') }));
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
  const updatedAt = new Date(data.updatedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return (
    <div>
      <main className={style.main}>
        <div className={style.heroBox}>
          <HeroImage title='新着情報' type='default' blur={true} />
          <Breadcrumb
            items={[
              { title: 'Top', href: '/' },
              { title: 'news', href: '/news' },
              { title: data.title, href: `/news/${slug}` },
            ]}
          />
        </div>
        <div className={style.container}>
          <div className={style.box}>
            <div className={style.metaBox}>
              <h2 className={style.docTitle}>{data.title}</h2>
              <div className={style.dateGroup}>
                <p className={style.dateText}>{updatedAt}</p>
                <div className={style.groupBox}>{data.group}</div>
              </div>
            </div>
            <hr className={style.line} />
            {/* 記事のタイトル等の動的コンテンツにXSSが発生する可能性が、信頼できるリソースからのみ提供されることとして許容する。 */}
            <Article content={html.content} />
          </div>
          <Toc tocData={html.toc} />
        </div>
      </main>
    </div>
  );
}
