import { Injectable } from '@angular/core';
import { addDoc, CollectionReference, DocumentReference, Firestore, WithFieldValue } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private readonly firestore: Firestore) { }

  public create<T>(collection: CollectionReference<T>, object: WithFieldValue<T>): Promise<DocumentReference<T>> {
    return addDoc(collection, object);
  }
}
