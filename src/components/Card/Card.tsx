import Link from 'next/link'
import React from 'react'
import style from './Card.module.css'

interface CardProps {
    title: string;
    content: string;
    date: string;
    group: string;
    link: string;
}
const Card: React.FC<CardProps> = ({ title, content, date, group, link}) => {

    return (
        <a href={link} className ={style.card}>
                <div className={style.img}>
                    <img
                        src='/images/maximum-card.png'
                        alt="maximum"
                    />
                    <div className={style.box}>
                        <p className={style.group}>{group}</p>
                    </div>
                </div>

                <p className={style.date}>{date}</p>
                <h2 className={style.title}>{title}</h2>
                <p className={style.text}>{content}</p>
        </a>
    );
};

export default Card;


