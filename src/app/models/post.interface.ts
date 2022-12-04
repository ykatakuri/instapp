import { Timestamp } from '@angular/fire/firestore';

export interface Post {
    id: string;
    creatorId: string;
    creatorName: string;
    title: string;
    imageUrl: string;
    likeCount: number;
    createAt?: Timestamp;
}