import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import type { UserData } from '@/types/types';

export const useUserData = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Получаем текущего пользователя из auth
        const currentUser = auth.currentUser;

        if (!currentUser) {
            setLoading(false);
            setUser(null);
            return;
        }

        const unsub = onSnapshot(
            doc(db, 'users', currentUser.uid),
            (snap) => {
                if (snap.exists()) {
                    // Объединяем данные из Firestore с uid из Auth
                    setUser({
                        id: snap.id,
                        uid: currentUser.uid,
                        ...(snap.data() as Omit<UserData, 'id' | 'uid'>),
                    });
                } else {

                    setUser(null);
                }
                setLoading(false);
            },
            (error) => {

                console.error('Error fetching user data:', error);
                setLoading(false);
                setUser(null);
            }
        );

        return () => unsub();
    }, []);

    return { user, loading };
};