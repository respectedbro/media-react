import type {Post} from '@/types/types.ts';

import styles from './PostItem.module.scss';

interface PostItemProps {
    post: Post;
    onDelete: (id: string) => void | Promise<void>;
}


export const PostItem = ({post, onDelete}: PostItemProps) => {
    return (
        <article className={styles.postCard}>
            <header className={styles.postHeader}>
                <div className={styles.postAuthor}>
                    <div className={styles.postAuthorAvatar}>
                        {post.authorName?.[0]}
                    </div>

                    <div className={styles.postAuthorInfo}>
                        <h4 className={styles.postAuthorName}>
                            {post.authorName}
                        </h4>

                        <time className={styles.postDate}>
                            {post.createdAt?.toDate?.().toLocaleString?.() ?? ''}
                        </time>
                    </div>
                </div>

                <button
                    className={styles.deletePostBtn}
                    onClick={() => onDelete(post.id)}
                >
                    ×
                </button>
            </header>

            <h3 className={styles.postCardTitle}>{post.title}</h3>
            <p className={styles.postCardContent}>{post.content}</p>

            <footer className={styles.postStats}>
                <button className={styles.likeBtn}>
                    ❤️ {post.likes}
                </button>
                <button className={styles.commentBtn}>
                    💬 {post.comments}
                </button>
            </footer>
        </article>
    );
};