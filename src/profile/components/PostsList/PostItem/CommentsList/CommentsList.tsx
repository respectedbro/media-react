import type {Comment} from '@/types/types.ts'

export const CommentsList = ({comments}:{comments: Comment[]}) => {
    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>{comment.authorName}</strong>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    )
}