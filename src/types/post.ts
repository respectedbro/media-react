import type {Timestamp} from 'firebase/firestore';

export interface Post {
    title: string;
    content:string,
    userId: string;
    likes:number,
    comments:number,
    createdAt: Timestamp;
    authorName: string;
    id?: string;

}