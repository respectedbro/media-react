import type {Post} from '@/types/types.ts';

import styles from './PostItem.module.scss';
import {useState} from 'react';
import {PostsComment} from '@/profile/components/PostsList/PostItem/PostComments/PostComment.tsx';
import {PostHeader} from '@/profile/components/PostsList/PostItem/PostHeader/PostHeader.tsx';
import {PostContent} from '@/profile/components/PostsList/PostItem/PostContent/PostContent.tsx';
import {PostActions} from '@/profile/components/PostsList/PostItem/PostActions/PostActions.tsx';

interface PostItemProps {
    post: Post;
    currentUserName:string
    currentUserId:string,
    onCommentAdded:(postId:string) => void
    onDelete: (id: string) => void | Promise<void>;
}


export const PostItem = ({post, onDelete, currentUserId, currentUserName, onCommentAdded}: PostItemProps) => {
    const [commentsOpen, setCommentsOpen] = useState(false);


    return (
        <div className={styles.postCard}>
            <PostHeader
                authorName={post.authorName}
                createdAt={post.createdAt}
                onDelete={() => onDelete(post.id)}
            />

            <PostContent
                title={post.title}
                content={post.content}
            />

            <PostActions
                likes={post.likes}
                onLike={() => {}}
                commentsCount={post.comments}
                onToggleComments={() => setCommentsOpen(p => !p)}
            />

            {commentsOpen && (
            <PostsComment
                postId={post.id}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                onCommentAdded={() => onCommentAdded(post.id)}
            />
            )}
        </div>
    );
};