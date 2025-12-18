import { useEffect, useState } from 'react'
import { auth, db } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import type { UserData } from '@/types/types'

export const useUserData = () => {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = auth.currentUser
        if (!currentUser)  return


        const unsub = onSnapshot(
            doc(db, 'users', currentUser.uid),
            snap => {
                if (snap.exists()) {
                    setUser(snap.data() as UserData)
                }
                setLoading(false)
            }
        )

        return () => unsub()
    }, [])

    return { user, loading }
}
