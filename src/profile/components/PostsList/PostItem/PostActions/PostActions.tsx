

import styles from './PostActions.module.scss';

interface PostActionsProps {
    likes: number;
    isLiked: boolean,
    commentsCount: number;
    onLike: () => void;
    onToggleComments: () => void;

}


export const PostActions = ({likes, isLiked, commentsCount, onLike, onToggleComments}: PostActionsProps) => {
    return (

            <div className={styles.postStats}>
                <button
                    className={isLiked ? styles.liked : styles.likeBtn}
                    onClick={onLike}
                >
                    ❤️ {likes}
                </button>
                <button className={styles.commentBtn} onClick={onToggleComments}>
                    💬 {commentsCount}
                </button>
            </div>

    )}