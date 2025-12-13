import {useEffect, useState} from 'react';
import {db} from '@/firebase/config.ts';
import {collection, query, where, getDocs, addDoc, deleteDoc, doc, Timestamp} from 'firebase/firestore';
import type {Post, PostCreatePayload} from '@/types/types.ts';

export const usePosts = (userId?: string) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (!userId) return;

        const loadPosts = async () => {
            const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
            const snap = await getDocs(postsQuery);
            setPosts(snap.docs.map(d => ({id: d.id, ...(d.data() as Omit<Post, 'id'>)})));
        };

        loadPosts();
    }, [userId]);

    const createPost = async (payload: PostCreatePayload) => {
        const ref = await addDoc(collection(db, 'posts'), {
            ...payload,
            createdAt: Timestamp.now()
        });


        setPosts(prev => [
            { id: ref.id, ...payload, createdAt: Timestamp.now() },
            ...prev,
        ]);
    };

    const deletePost = async (postId: string) => {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(prev => prev.filter(p => p.id !== postId));
    };

    return { posts, createPost, deletePost };
};