    import type {Post} from '@/types/types.ts';
    
    import styles from './PostItem.module.scss';
    import {useState} from 'react';
    import {PostsComment} from '@/profile/components/PostsList/PostItem/PostComments/PostComment.tsx';
    import {PostHeader} from '@/profile/components/PostsList/PostItem/PostHeader/PostHeader.tsx';
    import {PostContent} from '@/profile/components/PostsList/PostItem/PostContent/PostContent.tsx';
    import {PostActions} from '@/profile/components/PostsList/PostItem/PostActions/PostActions.tsx';
    
    interface PostItemProps {
        post: Post
        currentUserName: string
        currentUserId: string
        onCommentAdded: (postId: string) => void
        onDelete: (id: string) => void | Promise<void>
        onLike: () => void
        isLiking:boolean
        isMyProfile:boolean
    }
    
    
    export const PostItem = ({isMyProfile, isLiking, post, onDelete, currentUserId, currentUserName, onCommentAdded, onLike}: PostItemProps) => {
        const [commentsOpen, setCommentsOpen] = useState(false);
    
    
        return (
            <div className={styles.postCard}>
                <PostHeader
                    authorName={post.authorName}
                    createdAt={post.createdAt}
                    onDelete={() => onDelete(post.id)}
                    isMyProfile={isMyProfile}
                />
    
                <PostContent
                    title={post.title}
                    content={post.content}
                />
    
                <PostActions
                    likes={post.likedBy.length}
                    isLiked={post.likedBy.includes(currentUserId)}
                    commentsCount={post.commentsCount}
                    onLike={onLike}
                    onToggleComments={() => setCommentsOpen(p => !p)}
                    disabled={isLiking}
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