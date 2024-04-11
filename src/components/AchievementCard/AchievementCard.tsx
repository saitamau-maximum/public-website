import Link from 'next/link';
import React from 'react';
import {MdArrowForward} from 'react-icons/md';
import style from './AchievementCard.module.css';

interface AchievementCardProps {
    title: string;
    subtitle: string;
    description: string;
    iconUrl: string;
    slug: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
    title,
    subtitle,
    description,
    iconUrl,
    slug,
}) =>{
    return(
        <div className={style.box}>
            <div className={style.imageBox}>
                <img
                    className={style.image}
                    src={iconUrl}
                    alt={title}
                />
            </div>
            <Link href={`/achievements/${slug}`} className={style.link}>
                <h3 className={style.docTitle}>{title}</h3>
                <p className={style.docSubtitle}>{subtitle}</p>
                <p className={style.contents}>{description}</p>
                <p className={style.linkText}>
                    成績を見る
                    <MdArrowForward />
                </p>
            </Link>
        </div>
    );
}

export default AchievementCard;
