import type {Comment} from '@/types/types.ts'
import styles from '../PostItem.module.scss'

export const CommentsList = ({comments}:{comments: Comment[]}) => {

    if (!comments.length) {
        return <div className={styles.commentText}>Комментариев пока нет</div>;
    }

    return (
        <div className={styles.commentsList}>
            {comments.map(comment => (
                <div key={comment.id} className={styles.commentItem}>
                    <strong className={styles.commentAuthor}>{comment.authorName}</strong>
                    <p className={styles.commentText}>{comment.content}</p>
                </div>
            ))}
        </div>
    )
}