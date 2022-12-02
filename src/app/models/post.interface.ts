import { Timestamp } from '@angular/fire/firestore';

export interface Post {
    id: string;
    creator: string;
    title: string;
    imageUrl: string;
    likeCount: number;
    createAt?: Timestamp;
}