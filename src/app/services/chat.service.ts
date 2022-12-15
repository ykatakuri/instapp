import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, getDocs } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import { Observable } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { Chat } from '../models/chat.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { AppUser } from '../models/app.user.interface';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private msnCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly firestoreService: FirestoreService) {
    this.msnCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.MSN);

  }

  public deleteMessage(chat: Chat, sentAt: Timestamp): Promise<void> {
    return this.firestoreService.deleteMess(FIREBASE_COLLECTION_PATHS.MSN, chat, sentAt);
  }
  public sendMessage(chat: Chat): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.MSN, chat);
  }

  public fetchChat(direction: "asc" | "desc" = "asc", referenceUser: string | undefined): Observable<Chat[]> {
    return this.firestoreService.fetchConvById<Chat>(this.msnCollection, "lastModification", direction, referenceUser, "users");
  }

  public fetchConvById(idDoc: string): Observable<Chat> {
    return this.firestoreService.fetchById<Chat>(FIREBASE_COLLECTION_PATHS.MSN, idDoc);
  }

  public fetchUser(RefUser: DocumentReference): Observable<AppUser> {
    return this.firestoreService.fetchByDocumentReference<AppUser>(RefUser);
  }

  public updateMessage(chat: Chat, content: string, sentAt: Timestamp): Promise<void> {
    return this.firestoreService.updateMess(FIREBASE_COLLECTION_PATHS.MSN, chat,content, sentAt);
  }

  public getUserRef(ref: string) {
    return this.firestoreService.getUserRef(ref)
  }
}
