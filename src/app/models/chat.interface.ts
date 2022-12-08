import { Timestamp } from '@angular/fire/firestore';
import { AppUser } from './app.user.interface';

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date & Timestamp;
    userIds: string[];
    users: AppUser[];

    chatPicture?: string;
    chatName?: string;
}

export interface Message {
    text: string;
    senderId: string;
    sentDate: Date & Timestamp;
}