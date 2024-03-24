import Link from 'next/link';
import React from 'react';
import style from './Card.module.css';

interface CardProps {
  title: string;
  content: string;
  date: string;
  group: string;
  to: string;
  imageSrc: string;
  imageAlt: string;
  cardWidth: string;
}
const Card: React.FC<CardProps> = ({
  title,
  content,
  date,
  group,
  to,
  imageSrc,
  imageAlt,
  cardWidth,
}) => {
  //widthとして当てはまらない値の場合100%にする
  const width =
  /^(\d+(\.\d+)?(%|px|em|rem|cm|mm|in|pt|pc)|auto|inherit|initial|unset|fit-content|max-content|min-content)$/.test(
    cardWidth
  )
      ? cardWidth
      : '100%';

  return (
    <Link href={to} className={style.card} style={{ width }}>
      <div className={style.img}>
        <img className={style.img} src={imageSrc} alt={imageAlt} />
        <div className={style.box}>
          <p className={style.group}>{group}</p>
        </div>
      </div>

      <p className={style.date}>{date}</p>
      <p className={style.title}>{title}</p>
      <p className={style.text}>{content}</p>
    </Link>
  );
};

export default Card;
