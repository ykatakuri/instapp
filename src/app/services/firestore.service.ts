import { Injectable } from '@angular/core';
import { addDoc, AggregateField, AggregateQuerySnapshot, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, DocumentReference, enableIndexedDbPersistence, Firestore, getCountFromServer, limit, orderBy, query, startAfter, Timestamp, updateDoc, where, WithFieldValue } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Chat, Message } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private readonly firestore: Firestore) {
    enableIndexedDbPersistence(this.firestore, {
      forceOwnership: true,
    }).catch((reason) => {
      console.log('NO PERSISTENCE : ', reason);
    });
   }

  // Create a document
  public create<T>(collection: CollectionReference<T>, object: WithFieldValue<T>): Promise<DocumentReference<T>> {
    return addDoc(collection, object);
  }

  // Get the documents count of a collection
  public count(collection: CollectionReference<DocumentData>): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    const request = query(collection);
    return getCountFromServer(request);
  }

  // Fetch all documents of a collection
  public fetchAll<T>(collection: CollectionReference<DocumentData>, propertyName: string, direction: "asc" | "desc" = "asc"): Observable<T[]> {
    const request = query(collection, orderBy(propertyName, direction));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  // Fetch all documents of a collection within pagination
  public fetchByPagination<T>(collection: CollectionReference<DocumentData>, propertyName: string, startAfterProperty:
    string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {
    const request = query(collection, orderBy(propertyName, direction), limit(maxResult), startAfter(startAfterProperty));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  // public fetchByPagination<T>(
  //   collection: CollectionReference<DocumentData>,
  //   propertyName: string,
  //   startAfterProperty: string,
  //   maxResult: number = 30,
  //   direction: "asc" | "desc" = "asc"
  // ) {
  //   const request = query(collection, orderBy(propertyName, direction), limit(maxResult), startAfter(startAfterProperty));
  //   return collectionData(request, { idField: "id" }) as Observable<T[]>;
  // }

  // Fetch a document by ID
  public fetchById<T>(path: string, id: string): Observable<T> {
    const documentReference = doc(this.firestore, `${path}/${id}`);
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  public fetchConvById<T>(collection: CollectionReference<DocumentData>, propertyName: string, direction: "asc" | "desc" = "asc", referenceUser: string, path: string): Observable<T[]> {
    const documentReference = doc(this.firestore, `${path}/${referenceUser}`);
    const request = query(collection, where("users", "array-contains", documentReference), orderBy(propertyName, direction));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  // Fetch a document list by property
  public fetchByProperty<T>(collection: CollectionReference<DocumentData>, propertyName: string, propertyValue: string, maxResult: number = 5):
    Observable<T[]> {
    const request = query(collection, where(propertyName, "==", propertyValue), limit(maxResult));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }


//  Fetch a document list by email
  public fetchByEmail<T>(path: string, email: string): Observable<T> {
    const documentReference = doc(this.firestore, `${path}/${email}`);

    return docData(documentReference, { idField: "email" }) as Observable<T>;
  }

  // Update a document
  public update<T extends { id: any }>(path: string, object: T): Promise<void> {
    const documentReference = doc(this.firestore, `${path}/${object.id}`);
    return updateDoc(documentReference, { ...object });
  }

  // Delete a document
  public delete(path: string, id: string) {
    const documentReference = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(documentReference);
  }

  public fetchByDocumentReference<T>(documentReference: DocumentReference): Observable<T> {
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  public async updateMess<T extends { id: any }>(path: string, object: T, content: string, sentAt: Timestamp) {
    const documentReference = doc(this.firestore, `${path}/${object.id}`) as DocumentReference<Chat>;
    const donnee = await getDoc(documentReference)
    if (donnee.exists()) {
      const chat = donnee.data();
      const c = [...chat.messages]
      const i = c.findIndex((u) => u.sentAt.toDate().getTime() === sentAt.toDate().getTime());
      if(i !== -1) {
        const mess = c[i];
        mess.content = content
      }
      updateDoc(documentReference, { messages: c });
    }
  }
}
