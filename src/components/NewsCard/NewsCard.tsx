import Link from 'next/link';
import React from 'react';
import style from './NewsCard.module.css';

interface CardProps {
  style?: React.CSSProperties;
  title: string;
  content: string;
  date: string;
  group: string;
  to: string;
  imageSrc: string;
  imageAlt: string;
}
const Card: React.FC<CardProps> = ({
  style: customStyle,
  title,
  content,
  date,
  group,
  to,
  imageSrc,
  imageAlt,
}) => {
  // 画像が未設定の場合はデフォルト画像を表示
  if(!imageSrc) imageSrc = '/images/maximum-card.png';
  
  return (
    <Link href={to} className={style.card} style={customStyle}>
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
