import type {Timestamp} from 'firebase/firestore';

export interface UserData {
    id?: string,
    uid: string;
    email: string;
    fullName: string;
    city?: string;
    status?: 'online' | 'offline',
    age?: number;
    createAt?: string;
}

export interface Post {
    id: string;
    title: string;
    content: string,
    userId: string;
    authorName: string;
    likesCount: number;
    likedBy: string[];

    createdAt: Timestamp;
    commentsCount: number;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    authorName: string;
    content: string;
    createdAt: Timestamp;
}


export interface PostCreatePayload {
    title: string;
    content: string;
}

