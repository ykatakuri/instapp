import { DocumentReference, Timestamp } from "@angular/fire/firestore";

export interface Chat {
  id: string;
  lastModification: Timestamp;
  name: string;
  messages: Message[];
  users: DocumentReference[];
}

export interface Message{
  content: string;
  sender: DocumentReference;
  sentAt: Timestamp;
}
