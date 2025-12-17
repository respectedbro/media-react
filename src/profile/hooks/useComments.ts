import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    doc,
    updateDoc,
    increment
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Comment } from '@/types/types';

export const useComments = (postId: string) => {
    console.log('[useComments] init with postId:', postId);

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    const commentsRef = useMemo(
        () => collection(db, 'posts', postId, 'comments'),
        [postId]
    );

    const loadComments = useCallback(async () => {
        console.log('[loadComments] start for postId:', postId);
        setLoading(true);

        const q = query(commentsRef, orderBy('createdAt', 'asc'));
        const snap = await getDocs(q);

        setComments(
            snap.docs.map(d => ({
                id: d.id,
                ...(d.data() as Omit<Comment, 'id'>),
            }))
        );

        setLoading(false);
    }, [commentsRef, postId]);

    const addComment = useCallback(
        async (data: {
            userId: string;
            authorName: string;
            content: string;
        }) => {
            const createdAt = Timestamp.now();
//+комментарий
            const ref = await addDoc(commentsRef, {
                postId,
                userId: data.userId,
                authorName: data.authorName,
                content: data.content,
                createdAt,
            });
//+счётчик

            const postRef = doc(db, 'posts', postId)
            await  updateDoc(postRef, {
                commentsCount:increment(+1)
            })
//обновляем лок стейт
            setComments(prev => [
                ...prev,
                {
                    id: ref.id,
                    postId,
                    userId: data.userId,
                    authorName: data.authorName,
                    content: data.content,
                    createdAt,
                },
            ]);
        },
        [commentsRef, postId]
    );

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    return {
        comments,
        loading,
        addComment,
    };
};