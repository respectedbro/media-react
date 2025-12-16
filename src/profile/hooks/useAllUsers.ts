import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config.ts';
import type { UserData } from '@/types/types.ts';

interface UseAllUsersResult {
    users: UserData[];
    loading: boolean;
    error: string | null;
}

export function useAllUsers(currentUserId?: string): UseAllUsersResult {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!currentUserId) {
            setLoading(false);
            return;
        }

        const loadUsers = async () => {
            try {
                const snap = await getDocs(collection(db, 'users'));

                const usersList = snap.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }) as UserData)
                    .filter(user => user.uid !== currentUserId);

                setUsers(usersList);
            } catch (e) {
                console.log(e, 'что-то пошло не так');
                setError('ошибка загрузки');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [currentUserId]);

    return { users, loading, error };
}