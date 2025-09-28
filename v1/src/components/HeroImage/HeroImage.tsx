import clsx from 'clsx';
import React from 'react';
import style from './HeroImage.module.scss';

interface Props {
  title?: string;
  blur?: boolean;
  type?: 'default' | 'thumbnail';
}

export const HeroImage: React.FC<Props> = ({
  title,
  blur = false,
  type = 'default',
}) => {
  return (
    <div className={style.heroImagesContainer}>
      <img
        src={type === 'default' ? '/images/hero2.png' : '/images/hero.png'}
        alt='hero'
        className={clsx(
          style.heroImage,
          blur && style.blur,
          type === 'default' && style.default,
          type === 'thumbnail' && style.thumbnail,
        )}
      />
      <div className={style.heroTitle}>{title}</div>
    </div>
  );
};
