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
    likes: number,
    likedBy: string[];
    comments: number,
    createdAt: Timestamp;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    authorName: string;
    content: string;
    createdAt: Timestamp;
}


export interface PostCreatePayload  {
    title: string;
    content: string;
}

