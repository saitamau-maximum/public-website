import fs from 'fs/promises';
import path from 'path';
import { parseMarkdownToHTML } from '@saitamau-maximum/markdown-processor/server';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { Article } from '../../../components/Article/Article';
import Toc from '../../../components/Toc/Toc';
import style from './slug-styles.module.scss';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroImage } from '@/components/HeroImage';

interface Props {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {};
}
/*目次のためのinterfaceです*/
interface TocItem {
  depth: number;
  value: string;
  data: {
    id: string;
  };
  children: TocItem[];
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

  const tocData: TocItem[] = [
    {
      depth: 1,
      value: data.title,
      data: { id: 'container' },
      children: html.toc,
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.heroBox}>
        <HeroImage title='過去の実績' type='default' blur={true} />
        <Breadcrumb items={[{ title: 'Top', href: '/' }, { title: '過去の実績', href: '/achievements' }, { title: `${data.title}`, href: `/achievements/${slug}` }]} />
      </div>
      <div id='container' className={style.container}>
        <div className={style.box}>
          <img className={style.image} src={data.imageUrl} />
          <h2 className={style.title}>{data.title}</h2>
          <hr className={style.line} />
          {/* 記事のタイトル等の動的コンテンツにXSSが発生する可能性が、信頼できるリソースからのみ提供されることとして許容する。 */}
          <Article content={html.content} />
        </div>
        <Toc tocData={tocData} />
      </div>
    </main>
  );
}
