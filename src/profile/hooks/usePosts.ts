import {useCallback, useEffect, useState} from 'react';
import {db} from '@/firebase/config.ts';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    Timestamp,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import type {Post, PostCreatePayload} from '@/types/types.ts';

export const usePosts = (userId?: string, authorName?: string) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (!userId) return;

        const loadPosts = async () => {
            const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
            const snap = await getDocs(postsQuery);
            setPosts(
                snap.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Post, 'id'>)
                }))
            );
        };

        loadPosts();
    }, [userId]);

    const createPost = useCallback(async (data: PostCreatePayload) => {
            if (!userId || !authorName) return;

            const post: Omit<Post, 'id'> = {
                title: data.title,
                content: data.content,
                userId,
                authorName,
                likes: 0,
                likedBy: [],
                comments: 0,
                createdAt: Timestamp.now()
            };

            const ref = await addDoc(collection(db, 'posts'), post);

            setPosts(prev => [{id: ref.id, ...post}, ...prev]);

        }, [userId, authorName]
    );


    const deletePost = useCallback(async (postId: string) => {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(prev => prev.filter(p => p.id !== postId));
    }, []);

    const toggleLike = useCallback(
        async (postId: string, currentUserId: string) => {
            const post = posts.find(post => post.id === postId);
            if (!post) return;

            const isLiked = post.likedBy.includes(currentUserId);
            const ref = doc(db, 'posts', postId);

            await updateDoc(ref, {
                likes: increment(isLiked ? -1 : 1),
                likeBy: isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
            });

            setPosts(prev =>
                prev.map(p =>
                    p.id === postId
                        ? {
                            ...p,
                            likes: isLiked ? p.likes - 1 : p.likes + 1,
                            likedBy: isLiked
                                ? p.likedBy.filter(id => id !== currentUserId)
                                : [...p.likedBy, currentUserId]
                        } : p
                )
            );

        }, [posts]
    );

    return {posts, createPost, deletePost, toggleLike};
};