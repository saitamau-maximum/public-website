import clsx from 'clsx';
import React from 'react';
import style from './DynamicHeroImage.module.scss';

interface Props {
  title?: string;
  blur?: boolean;
  type?: 'default' | 'thumbnail';
}

export const DynamicHeroImage: React.FC<Props> = ({
  title,
  blur = false,
  type = 'default',
}) => {
  return (
    <div className={style.heroImagesContainer}>
      <img
        src={type === 'default' ? '/images/hero2.png' : '/images/hero.png'}
        alt='hero'
        className={clsx(style.heroImage, {
          [style.blur]: blur,
          [style.default]: type === 'default',
          [style.thumbnail]: type === 'thumbnail',
        })}
      />
      <div className={style.heroTitle}>{title}</div>
    </div>
  );
};
