

import styles from './PostActions.module.scss';

interface PostActionsProps {
    likes: number;
    commentsCount: number;
    onLike: () => void;
    onToggleComments: () => void;
}


export const PostActions = ({likes, commentsCount, onLike, onToggleComments}: PostActionsProps) => {
    return (

            <div className={styles.postStats}>
                <button className={styles.likeBtn} onClick={onLike}>
                    ❤️ {likes}
                </button>
                <button className={styles.commentBtn} onClick={onToggleComments}>
                    💬 {commentsCount}
                </button>
            </div>

    )}