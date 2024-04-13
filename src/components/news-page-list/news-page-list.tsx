import path from 'path';
import Link from 'next/link';
import React from 'react';
import NewsListSrc from './news-list-view';
import style from './news-page-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

export async function NewsPageList(this: any) {
  // newsの中身を取得
  const docsDir = path.join(process.cwd(), 'docs', 'news');
  const docs = await getMarkdowns(docsDir);

  if (docs.length === 0) {
    return (
      <div className={style.isEmpty}>
        <p>新着記事がありません</p>
        <Link href='/'>Topへ戻る</Link>
      </div>
    );
  }

  // 一覧を日付でソート
  docs.sort((a, b) =>
    a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1,
  );

  return <NewsListSrc docs={docs} />;
}
