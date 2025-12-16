import styles from './PostList.module.scss';
import type {Post} from '@/types/types.ts';
import {PostItem} from '@/profile/components/PostsList/PostItem/PostItem.tsx';
import {EmptyPosts} from '@/profile/components/PostsList/EmptyPosts/EmptyPosts.tsx';
import {useCurrentUser} from '@/profile/hooks/useCurrentUser'

interface PostListProps {
    posts: Post[];
    onDelete: (id: string) => void | Promise<void>;
    currentUserId:string,
    onToggleLike:(postId:string) => void
}

export const PostList = ({posts, onDelete,  onToggleLike}:PostListProps) => {
    const { user: currentUser, loading } = useCurrentUser();
    if (loading) return null;
    if (!currentUser) return null;

    if (!posts.length) {
        return <EmptyPosts/>
    }
    return (
        <div className={styles.postsBox}>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                    onDelete={onDelete}
                    onToggleLike={onToggleLike}
                    currentUserId={currentUser.uid}
                    currentUserName={currentUser.fullName}
                />
            ))}

        </div>
    );
};