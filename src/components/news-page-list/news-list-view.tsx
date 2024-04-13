'use client';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import style from './news-page-list.module.scss';
import { NewsLinkCard } from '@/components/NewsLinkCard'; // 仮のパス

interface Doc {
  slug: string;
  content: string;
  frontmatter: {
    [key: string]: any;
  };
}
interface Props {
  docs: Doc[];
}

export default function NewsListSrc({ docs }: Props) {
  const perPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handlePageChange = (selectedPage: {
    selected: React.SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleGroupChange = (group: string | null) => {
    setSelectedGroup(group);
    setCurrentPage(0); // ページングをリセット
  };

  if (selectedGroup) {
    docs = docs.filter((doc) => doc.frontmatter.group === selectedGroup);
  }
  const startIndex = currentPage * perPage;
  const displayedDocs = docs.slice(startIndex, startIndex + perPage);

  return (
    <div className={style.cardContainer}>
      {/*
      <div className={style.selectTable}>
        <button 
          onClick={() => handleGroupChange(null)} 
          className={selectedGroup === null ? style.activeButton : style.button}
        >すべて</button> 
        <button 
          onClick={() => handleGroupChange('Web研')} 
          className={selectedGroup === 'Web研' ? style.activeButton : style.button}
        >Web研</button> 
        <button 
          onClick={() => handleGroupChange('競プロ')} 
          className={selectedGroup === '競プロ' ? style.activeButton : style.button}
        >競プロ</button> 
      </div>
  */}
      {displayedDocs.map((doc) => (
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
      <ReactPaginate
        pageCount={Math.ceil(docs.length / perPage)}
        marginPagesDisplayed={1} //端ページの個数です
        pageRangeDisplayed={2} //前後の表示数です
        onPageChange={handlePageChange}
        containerClassName={style.pagination}
        pageClassName={style.pageItem}
        pageLinkClassName={style.pageLink}
        activeClassName={style.active}
        previousLabel='' //前のページ番号に戻すリンクのテキスト
        nextLabel='' //次のページに進むボタンのテキスト
        previousClassName={style.noNeed} // '<'の親要素(li)のクラス名
        nextClassName={style.noNeed} //'>'の親要素(li)のクラス名
        previousLinkClassName={style.noNeed} //'<'のリンクのクラス名
        nextLinkClassName={style.noNeed} //'>'のリンクのクラス名
        disabledClassName='disabled'
        breakLabel='>>'
        breakClassName={style.pageItem}
        breakLinkClassName={style.pageLink}
      />
    </div>
  );
}
