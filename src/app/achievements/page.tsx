import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MdArrowForward } from "react-icons/md";
import { Doc, getMarkdowns } from '../../utils/markdown';
import style from './list-styles.module.css';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    '埼玉大学プログラミングサークル「Maximum」の大会参加報告や過去の実績をまとめたページです。',
};

export default async function Achievements() {
  // achievementの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'achievement');
  const docs = await getMarkdowns(docsDir);

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return (
    <div>
      <div className={style.heroBox}>
        <h1 className={style.heroText}>過去の実績</h1>
        <img className={style.heroImage} src='/heros/hero.png' />
      </div>
      <div className={style.container}>
        <h2 className={style.title}>参加した大会</h2>
        {docs.map((doc) => (
          <div key={doc.slug} className={style.box}>
            <div className={style.imageBox}>
              <img
                className={style.image}
                src={doc.frontmatter.iconUrl}
                alt={doc.frontmatter.title}
              />
            </div>
            <div>
              <h3 className={style.docTitle}>{doc.frontmatter.title}</h3>
              <p className={style.docSubtitle}>{doc.frontmatter.subtitle}</p>
              <p className={style.contents}>{doc.frontmatter.description}</p>
              <Link className={style.link} href={`/achievements/${doc.slug}`}>
                成績を見る
                <MdArrowForward />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
