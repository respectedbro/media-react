import {arrayRemove, arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase/config'

export const useFriend = async (currentId:string, targetId:string) => {
    const currentUserRef = doc(db, 'users', currentId)
    const targetUserRef = doc(db, 'users', targetId)

    await Promise.all([
        updateDoc(currentUserRef, {
            friends: arrayUnion(currentId)
        }),
        updateDoc(targetUserRef, {
            friends: arrayUnion(targetId)
        })
    ])
}
export const removeFriend = async (currentId:string, targetId:string) => {
    const currentUserRef = doc(db, 'users', currentId)
    const targetUserRef = doc(db, 'users', targetId)

    await Promise.all([
        updateDoc(currentUserRef, {
            friends: arrayRemove(currentId)
        }),
        updateDoc(targetUserRef, {
            friends: arrayRemove(targetId)
        })
    ])
}
