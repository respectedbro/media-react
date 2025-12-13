import type {Timestamp} from 'firebase/firestore';

export interface UserData {
    id?:string,
    uid: string;
    email: string;
    fullName: string;
    status?:'online' | 'offline',
    age?: number;
    city?: string;
    createAt?: string;
}

export interface Post {
    title: string;
    content:string,
    userId: string;
    likes:number,
    comments:number,
    createdAt: Timestamp;
    authorName: string;
    id: string;

}

export interface newPost {
    title: string;
    content: string;
}

export type PostCreatePayload = {
    title: string;
    content: string;
    userId: string;
    authorName: string;
    likes: number;
    comments: number;
};