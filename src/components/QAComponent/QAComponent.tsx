import React from 'react';
import styles from './QAComponent.module.scss';

interface QAItem {
  question: string;
  answer: string;
}

export const QAComponent: React.FC<QAItem> = ({
  question,
  answer,
}) => {
  return (
    <div className={styles.QAcontainer}>
      <div className={styles.chatMessageQuestion}>
        <div className={styles.chara}>Q</div>
        <p>{question}</p>
      </div>
      <div className={styles.chatMessageAnswer}>
        <div className={styles.chara}>A</div>
        <p>{answer}</p>
      </div>
    </div>
  );
};