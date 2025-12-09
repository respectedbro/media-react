import React from 'react';
import styles from './PostList.module.scss';
import type {Post} from '@/types/types';

interface PostListProps {
    posts: Post[];
    onDelete: (id: string) => void | Promise<void>;
}

export const PostList: React.FC<PostListProps> = ({posts, onDelete}) => {
    return (
        <div className={styles.postsBox}>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className={styles.postCard}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAuthor}>
                                <div className={styles.postAuthorAvatar}>{post.authorName?.[0]}</div>
                                <div className={styles.postAuthorInfo}>
                                    <h4 className={styles.postAuthorName}>{post.authorName}</h4>
                                    <span className={styles.postDate}>
                  {post.createdAt?.toDate?.().toLocaleString?.() ?? ''}
                </span>
                                </div>
                            </div>

                            <button
                                className={styles.deletePostBtn}
                                onClick={() => onDelete(post.id!)}
                            >
                                ×
                            </button>
                        </div>

                        <h3 className={styles.postCardTitle}>{post.title}</h3>
                        <p className={styles.postCardContent}>{post.content}</p>

                        <div className={styles.postStats}>
                            <button className={styles.likeBtn}>❤️ {post.likes}</button>
                            <button className={styles.commentBtn}>💬 {post.comments}</button>
                        </div>
                    </div>
                ))
            ) : <div className={styles.noPosts}>
                <div className={styles.noPostsIcon}>📝</div>
                <p className={styles.noPostsText}>У вас пока нет постов</p>
            </div>}

        </div>
    );
};