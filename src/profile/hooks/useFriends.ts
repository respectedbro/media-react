import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { UserData } from '@/types/types'

interface UseFriendsResult {
    friends: UserData[]
    loading: boolean
}

export function useFriends(friendIds: string[]): UseFriendsResult {
    const [friends, setFriends] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!friendIds || friendIds.length === 0) {
            setFriends([])
            setLoading(false)
            return
        }

        const loadFriends = async () => {
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', 'in', friendIds)
                )

                const snap = await getDocs(q)

                const friendsList = snap.docs.map(
                    doc =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as UserData
                )

                setFriends(friendsList)
            } catch (e) {
                console.error('Ошибка загрузки друзей', e)
            } finally {
                setLoading(false)
            }
        }

        loadFriends()
    }, [friendIds])

    return { friends, loading }
}
