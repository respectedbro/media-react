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