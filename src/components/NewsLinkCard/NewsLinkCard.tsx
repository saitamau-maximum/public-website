import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import style from './NewsLinkCard.module.scss';

interface CardProps {
  title: string;
  content: string;
  date: string;
  group: string;
  to: string;
}
export const NewsLinkCard: React.FC<CardProps> = ({
  title,
  content,
  date,
  group,
  to,
}) => {
  return (
    <div className={style.container}>
      <p className={style.dateForPC}>{date}</p>
      <Link href={to} className={style.card}>
        <div className={style.headForMobile}>
          <p className={style.date}>{date}</p>
          <p className={style.group}>{group}</p>
        </div>
        <div className={style.head}>
          <h2 className={style.title}>{title}</h2>
          <p className={style.group}>{group}</p>
        </div>
        <p className={style.text}>{content}</p>
        <p className={style.learn}>
          記事を読む&nbsp;
          <MdArrowForward />
        </p>
      </Link>
    </div>
  );
};
