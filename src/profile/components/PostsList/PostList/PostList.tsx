import styles from './PostList.module.scss';
import type {Post} from '@/types/types.ts';
import {PostItem} from '@/profile/components/PostsList/PostItem/PostItem';
import {EmptyPosts} from '@/profile/components/PostsList/EmptyPosts/EmptyPosts';
import {useUserData} from '@/profile/hooks/useUserData';
import {useEffect, useState} from 'react';
import {toggleLike} from '@/profile/hooks/toggleLike';

interface PostListProps {
    posts: Post[];
    onDelete: (id: string) => void | Promise<void>;
}

export const PostList = ({posts, onDelete}:PostListProps) => {
    const { user: currentUser, loading } = useUserData();
    const [localPosts, setLocalPosts] = useState<Post[]>(posts);
    const [likingPostId, setLikingPostId] = useState<string | null>(null)



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
        if (likingPostId === postId) return

        setLikingPostId(postId)

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
                }
            })
        )

        try {
            await toggleLike(postId, userId, hasLiked)
        } finally {
            setLikingPostId(null)
        }
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
                    currentUserName={currentUser.fullName} // ← УБРАЛ displayName
                    onCommentAdded={handleCommentAdded}
                    isLiking={likingPostId === post.id}
                />
            ))}

        </div>
    );
};