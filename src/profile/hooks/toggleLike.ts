import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const toggleLike = async (
    postId: string,
    userId: string,
    hasLiked: boolean
) => {
    const postRef = doc(db, 'posts', postId)

    await updateDoc(postRef, {
        likedBy: hasLiked
            ? arrayRemove(userId)
            : arrayUnion(userId),
    })
}
