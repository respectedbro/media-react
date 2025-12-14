

import styles from './PostContent.module.scss';

interface PostContentProps {
    title: string;
    content: string;
}


export const PostContent = ({title, content}: PostContentProps) => {
    return (
        <div className={styles.postCard}>
            <h3 className={styles.postCardTitle}>{title}</h3>
            <p className={styles.postCardContent}>{content}</p>

        </div>
    );
};