import { Timestamp } from '@firebase/firestore';

export interface PostComment {
    comment: string;
    userId: string;
    userFullname: string;
    createAt: Timestamp;
}