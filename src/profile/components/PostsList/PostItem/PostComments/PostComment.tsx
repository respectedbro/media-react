import {useComments} from '@/profile/hooks/useComments.ts';
import {CommentsList} from '@/profile/components/PostsList/PostItem/CommentsList/CommentsList.tsx';
import CommentForm from '@/profile/components/PostsList/PostItem/CommentForm/CommentForm.tsx';

interface PostCommentProps {
    postId:string
    currentUserId:string
    currentUserName:string
    onCommentAdded: () => void
}

export const PostsComment = ({  postId, currentUserId, currentUserName}:PostCommentProps) => {
    const {comments, addComment} = useComments(postId)


    const handleSubmit = async (text: string) => {
        if (!currentUserId || !currentUserName) return;

        await addComment({
            userId: currentUserId,
            authorName: currentUserName,
            content: text,
        });
    };

    return (
        <div>
            <CommentsList comments={comments}/>

            <CommentForm onSubmit={handleSubmit}/>
        </div>
    )
}