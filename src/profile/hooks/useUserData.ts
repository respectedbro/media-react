import { useEffect, useState } from 'react'
import { auth, db } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import type { UserData } from '@/types/types'


export const useUserData = (uid?: string) => {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userId = uid ?? auth.currentUser?.uid
        if (!userId) {
            return
        }


        const unsub = onSnapshot(
            doc(db, 'users', userId),
            snap => {
                if (snap.exists()) {
                    setUser(snap.data() as UserData)
                }
                setLoading(false)
            }
        )

        return () => unsub()
    }, [uid])

    return { user, loading }
}
