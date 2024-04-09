import styles from './Article.module.css';

interface Props {
    content: string;
}

export const Article = ({content}: Props) => {
    return (
        <article className={styles.content} dangerouslySetInnerHTML={{__html:content}} />
    );
}