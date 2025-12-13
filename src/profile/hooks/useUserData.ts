import {useEffect, useState} from 'react';
import {auth, db} from '@/firebase/config.ts'
import {doc, getDoc} from 'firebase/firestore';
import type {UserData} from '@/types/types.ts'


export const useUserData = () => {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            const currentUser =auth.currentUser
            if (!currentUser) {
                setLoading(false)
                return
            }

            const snap = await getDoc(doc(db, 'users', currentUser.uid))
            if (snap.exists()) setUser(snap.data() as UserData)
            setLoading(false)
        }

        loadUser()
    }, []);

    return {user, loading}
}