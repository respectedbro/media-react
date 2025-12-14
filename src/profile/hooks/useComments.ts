import { useCallback, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Comment } from '@/types/types';

export const useComments = (postId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    const loadComments = useCallback(async () => {
        setLoading(true);

        const q = query(
            collection(db, 'comments'),
            where('postId', '==', postId),
            orderBy('createdAt', 'asc')
        );

        const snap = await getDocs(q);

        setComments(
            snap.docs.map(d => ({
                id: d.id,
                ...(d.data() as Omit<Comment, 'id'>),
            }))
        );

        setLoading(false);
    }, [postId]);

    const addComment = useCallback(
        async (data: {
            userId: string;
            authorName: string;
            content: string;
        }) => {
            await addDoc(collection(db, 'comments'), {
                postId,
                ...data,
                createdAt: Timestamp.now(),
            });

            await loadComments();
        },
        [postId, loadComments]
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
