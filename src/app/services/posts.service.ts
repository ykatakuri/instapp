import { Injectable } from '@angular/core';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  public getAllPosts(direction: "asc" | "desc" = "desc"): Observable<Post[]> {
    return this.firestoreService.fetchAll<Post>(this.postsCollection, "createAt", direction);
  }

  public getUserPosts(id: string, maxResult?: 6): Observable<Post[]> {
    return this.firestoreService.fetchByProperty<Post>(this.postsCollection, "creatorId", id, maxResult);
  }

  public getPostById(id: string): Observable<Post> {
    return this.firestoreService.fetchById<Post>(FIREBASE_COLLECTION_PATHS.POSTS, id);
  }

  public updatePost(post: Post): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.POSTS, post);
  }

  public async countPosts(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.firestoreService.count(this.postsCollection);
  }
}
