import { DocumentReference } from "@angular/fire/firestore";

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  users: DocumentReference[];
}

export interface Message{
  content: string;
  sender: string;
  sentAt: string;
}
