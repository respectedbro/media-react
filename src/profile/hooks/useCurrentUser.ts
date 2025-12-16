import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { UserData } from '@/types/types'

export const useCurrentUser = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const auth = getAuth()
        const authUser = auth.currentUser

        if (!authUser) {
            setLoading(false)
            return
        }

        const loadUser = async () => {
            const snap = await getDoc(doc(db, 'users', authUser.uid));

            if (snap.exists()) {
                setUser({
                    id: snap.id,
                    uid: authUser.uid,
                    ...(snap.data() as Omit<UserData, 'id' | 'uid'>),
                });
            }
            setLoading(false)
        }

        loadUser()
    }, []);

    return {user, loading}
}