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
}
const Card: React.FC<CardProps> = ({ title, content, date, group, to, imageSrc }) => {
  return (
    <Link href={to} className={style.card}>
      <div className={style.img}>
        <img
          className={style.img}
          src={imageSrc}
          alt='maximum'
        />
        <div className={style.box}>
          <p className={style.group}>{group}</p>
        </div>
      </div>

      <p className={style.date}>{date}</p>
      <h2 className={style.title}>{title}</h2>
      <p className={style.text}>{content}</p>
    </Link>
  );
};

export default Card;
