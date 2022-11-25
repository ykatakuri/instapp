import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, getDocs } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { GenericFirestoreService } from './generic-firestore.service.service';
import { FIREBASE_COLLECTION_PATHS } from '../core/constants/firestore-collection-paths.constant';
import { Chat } from '../models/chat.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { AppUser } from '../models/app-user.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private msnCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.msnCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.MSN);

  }

  public updateConv(chat: Chat): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.MSN, chat);
  }

  public fetchChat(direction: "asc" | "desc" = "asc", referenceUser: string): Observable<Chat[]> {
    return this.genericFirestoreService.fetchConvById<Chat>(this.msnCollection, "lastModification", direction, referenceUser, "user");
  }

  public fetchConvById(idDoc: string): Observable<Chat> {
    return this.genericFirestoreService.fetchById<Chat>(FIREBASE_COLLECTION_PATHS.MSN, idDoc);
  }

  public fetchUser(RefUser: DocumentReference): Observable<AppUser> {
    return this.genericFirestoreService.fetchByDocumentReference<AppUser>(RefUser);
  }
}
