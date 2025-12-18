import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const addFriend = async (currentId: string, targetId: string) => {
    if (currentId === targetId) {
        console.warn('Нельзя добавить себя в друзья')
        return
    }

    const currentUserRef = doc(db, 'users', currentId)
    const targetUserRef = doc(db, 'users', targetId)

    await Promise.all([
        updateDoc(currentUserRef, {
            friends: arrayUnion(targetId),
        }),
        updateDoc(targetUserRef, {
            friends: arrayUnion(currentId),
        }),
    ])
}

export const removeFriend = async (currentId: string, targetId: string) => {
    const currentUserRef = doc(db, 'users', currentId)
    const targetUserRef = doc(db, 'users', targetId)

    await Promise.all([
        updateDoc(currentUserRef, {
            friends: arrayRemove(targetId),
        }),
        updateDoc(targetUserRef, {
            friends: arrayRemove(currentId),
        }),
    ])
}
