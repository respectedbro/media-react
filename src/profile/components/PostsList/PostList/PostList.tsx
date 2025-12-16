import styles from './PostList.module.scss';
import type {Post} from '@/types/types.ts';
import {PostItem} from '@/profile/components/PostsList/PostItem/PostItem.tsx';
import {EmptyPosts} from '@/profile/components/PostsList/EmptyPosts/EmptyPosts.tsx';
import {useCurrentUser} from '@/profile/hooks/useCurrentUser'
import {useEffect, useState} from 'react';
import {toggleLike} from '@/profile/hooks/toggleLike.ts';

interface PostListProps {
    posts: Post[];
    onDelete: (id: string) => void | Promise<void>;
}

export const PostList = ({posts, onDelete}:PostListProps) => {
    const { user: currentUser, loading } = useCurrentUser();
    const [localPosts, setLocalPosts] = useState<Post[]>(posts)



    useEffect(() => {
        setLocalPosts(posts)
    }, [posts]);

    if (loading) return null;
    if (!currentUser) return null;

    const userId = currentUser.uid

    if (!posts.length) {
        return <EmptyPosts/>
    }


    const handleCommentAdded = (postId: string) => {
        setLocalPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post
            )
        );
    };

    const handleToggleLike = async (postId: string) => {
        let hasLiked = false

        setLocalPosts(prev =>
            prev.map(post => {
                if (post.id !== postId) return post

                hasLiked = post.likedBy.includes(userId)

                return {
                    ...post,
                    likedBy: hasLiked
                        ? post.likedBy.filter(id => id !== userId)
                        : [...post.likedBy, userId],
                    likesCount: hasLiked
                        ? post.likesCount - 1
                        : post.likesCount + 1,
                }
            })
        )

        await toggleLike(postId, userId, hasLiked)
    }


    return (
        <div className={styles.postsBox}>
            {localPosts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                    onDelete={onDelete}
                    onLike={() => handleToggleLike(post.id)}
                    currentUserId={currentUser.uid}
                    currentUserName={currentUser.fullName}
                    onCommentAdded={handleCommentAdded}
                />
            ))}

        </div>
    );
};