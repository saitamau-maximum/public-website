import clsx from 'clsx';
import Link from 'next/link';
import style from './MediaLinkCard.module.scss';

interface MediaLinkCardProps {
  title: string;
  id: string;
  imageUrl: string;
  imageAlt: string;
}

export const MediaLinkCard: React.FC<MediaLinkCardProps> = ({
  title,
  id,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className={style.frame}>
      <Link
        href='https://twitter.com/Maximum03400346'
        target='_blank'
        rel='noopener noreferrer'
        className={style.link}
      >
        <div className={style.imgBox}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={style.icon}
          />
        </div>
        <div className={style.overlay}>
          <p className={clsx(style.bold, style.text)}>{title}</p>
          <p className={clsx(style.bold, style.subtext)}>{id}</p>
        </div>
      </Link>
    </div>
  );
}