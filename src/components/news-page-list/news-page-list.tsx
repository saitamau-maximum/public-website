import path from 'path';
import Link from 'next/link';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { NewsLinkCard } from '../NewsLinkCard';
import style from './news-page-list.module.scss';
import { getMarkdowns } from '@/utils/markdown';

class Index extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      books: [],
      start: 0, //最初は0番目(=最新)の要素から
      perPage: 12, //1ページには12冊表示
    };
  }
  pageChange(data) {
    let pageNumber = data['selected']; //選択されたページ番号
    this.setState({
      //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと12 * 1で12番が先頭になる、つまり13番目以降の書籍が表示される)
      start: pageNumber * this.state.perPage,
    });
  }
}
export async function NewsPageList(this: any) {
  const perPage: number = 2; //１ページ当たりのお知らせ数
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

  return (
    <div>
      <div className={style.cardContainer}>
        {docs.map((doc) => (
          <NewsLinkCard
            key={doc.slug}
            title={doc.frontmatter.title}
            content={doc.frontmatter.description}
            date={new Date(doc.frontmatter.updatedAt).toLocaleDateString(
              'ja-JP',
              { year: 'numeric', month: '2-digit' },
            )}
            group={doc.frontmatter.group}
            to={`/news/${doc.slug}`}
          />
        ))}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(docs.length / perPage)} //総ページ数。
        marginPagesDisplayed={1} //先頭と末尾に表示するページの数。今回は2としたので1,…今いるページの前後…後ろから1番目 のように表示されます。
        pageRangeDisplayed={1} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
        onPageChange={this.pageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
        containerClassName='pagination' //ページネーションリンクの親要素のクラス名
        pageClassName='page-item' //各子要素(li要素)のクラス名
        pageLinkClassName='page-link' //ページネーションのリンクのクラス名
        activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
        disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
        breakLabel='>>' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
        breakClassName='page-item' // 上記の「>>」のクラス名
        breakLinkClassName='page-link' // [>>」の中のリンクにつけるクラス
      />
    </div>
  );
}
