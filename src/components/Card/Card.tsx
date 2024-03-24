import Link from 'next/link';
import React from 'react';
import style from './Card.module.css';

interface CardProps {
  customStyle?: React.CSSProperties | undefined;
  title: string;
  content: string;
  date: string;
  group: string;
  to: string;
  imageSrc: string;
  imageAlt: string;
}
const Card: React.FC<CardProps> = ({
  customStyle,
  title,
  content,
  date,
  group,
  to,
  imageSrc,
  imageAlt,
}) => {
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
