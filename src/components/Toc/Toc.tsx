import Link from 'next/link';
import React from 'react';
import style from './Toc.module.css';

interface TocItem {
  depth: number;
  value: string;
  data: {
    id: string;
  };
  children: TocItem[];
}

const Toc: React.FC<{ tocData: TocItem[] }> = ({ tocData }) => {
  const renderTocItems = (items: TocItem[]) => {
    return items.map((item, index) => (
      <div
        key={index}
        className={style.tocItem}
        style={{
          marginLeft: `${item.depth * 7.5}px`,
          borderLeft: `${item.depth > 1 ? '1.5px solid #d3d3d3' : 'none'}`,
        }}
      >
        <Link className={style.value} href={`#${item.data.id}`}>
          {item.value}
        </Link>
        {item.children.length > 0 && renderTocItems(item.children)}
      </div>
    ));
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>目次</h3>
      <hr className={style.line} />
      {renderTocItems(tocData)}
    </div>
  );
};

export default Toc;
