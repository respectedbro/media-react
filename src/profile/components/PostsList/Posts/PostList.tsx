import styles from './PostList.module.scss';
import type {Post} from '@/types/types.ts';
import {PostItem} from '@/profile/components/PostsList/PostItem/PostItem.tsx';
import {EmptyPosts} from '@/profile/components/PostsList/EmptyPosts/EmptyPosts.tsx';

interface PostListProps {
    posts: Post[];
    onDelete: (id: string) => void | Promise<void>;
    currentUserId:string,
    onToggleLike:(postId:string) => void
}

export const PostList = ({posts, onDelete, currentUserId, onToggleLike}:PostListProps) => {
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
                    currentUserId={currentUserId}
                />
            ))}

        </div>
    );
};