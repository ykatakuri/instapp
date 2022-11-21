import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, getDocs } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
// import { addDoc, collectionData, deleteDoc, docData, DocumentReference, Firestore, query, updateDoc, where, limit, orderBy, startAfter, WithFieldValue } from "@angular/fire/firestore";
// import { CollectionReference, doc, DocumentData } from "@firebase/firestore";
import { Observable } from "rxjs";
import { GenericFirestoreService } from './generic-firestore.service.service';
import { FIREBASE_COLLECTION_PATHS } from '../core/constants/firestore-collection-paths.constant';
import { Chat } from '../models/chat.interface';
import { Message } from '../models/chat.interface';
import { ListeChat } from '../models/liste-chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private msnCollection: CollectionReference<DocumentData>;

  // private listeChatsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.msnCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.MSN);

    // this.listeChatsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.LISTECHAT);
  }

  public fetchChat(direction: "asc" | "desc" = "asc", referenceUser: string): Observable<Chat[]> {
    return this.genericFirestoreService.fetchConvById<Chat>(this.msnCollection, "lastModification", direction, referenceUser);
    // return this.genericFirestoreService.fetchByDocumentReference<Chat[]>(documentReference)
  }

  public fetchConv(idDoc: string): Observable<Chat[]> {
    return this.genericFirestoreService.fetchConv<Chat>(this.msnCollection, idDoc);
  }

  // public fetchListeChat(direction: "asc" | "desc" = "asc"): Observable<ListeChat[]> {
  //   return this.genericFirestoreService.fetchAll<ListeChat>(this.listeChatsCollection, "userReferences", direction);
  // }



}
