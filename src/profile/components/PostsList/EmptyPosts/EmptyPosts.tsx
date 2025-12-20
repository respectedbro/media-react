import styles from './EmptyPosts.module.scss';

export const EmptyPosts = () => {
    return (
        <div className={styles.noPosts}>
            <div className={styles.noPostsIcon}>📝</div>
            <p className={styles.noPostsText}>Пока нет постов</p>
        </div>
    );
};