import { Injectable } from '@angular/core';
import { collection, CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { Post } from '../models/post.interface';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsCollection: CollectionReference<DocumentData>;
  constructor(
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {
    this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
  }

  public addNewPost(post: Post): Promise<DocumentReference<DocumentData>> {
    return this.firestoreService.create(this.postsCollection, post);
  }
}