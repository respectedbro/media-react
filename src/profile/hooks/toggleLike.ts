import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const toggleLike = async (
    postId: string,
    userId: string,
    hasLiked: boolean
) => {
    const postRef = doc(db, 'posts', postId)

    if (hasLiked) {
        await updateDoc(postRef, {
            likedBy: arrayRemove(userId),
            likesCount: increment(-1),
        })
    } else {
        await updateDoc(postRef, {
            likedBy: arrayUnion(userId),
            likesCount: increment(1),
        })
    }
}