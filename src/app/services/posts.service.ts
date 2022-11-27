import { Injectable } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";
import { CollectionReference, DocumentData, AggregateField, AggregateQuerySnapshot, query, orderBy, DocumentReference, collection } from "firebase/firestore";
import { EMPTY, Observable, of } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";

import { GenericStorageService } from "./generic-storage.service";
import { AppPost } from "../models/app-post.interface";
import { Post } from '../models/post.interface';
import { Firestore } from "@angular/fire/firestore";
import { FirestoreService } from "./firestore.service";

@Injectable({
  providedIn: 'root',
})

export class PostsService {

  private postsCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    private genericStorageService: GenericStorageService,
    private firestoreService: FirestoreService
    ) {
    this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
  }

  public fetchPosts(direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.firestoreService.fetchAll<AppPost>(this.postsCollection, "title", direction);
  }

  // public fetchFriendsPosts(direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
  public fetchPostsById(id : string, direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.firestoreService.fetchAll<AppPost>(this.postsCollection, "title", direction);
  }

  public fetchPostsByUserId(id : string, direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.firestoreService.fetchByProperty(this.postsCollection, "idUser", id, 10);
  }

  public addNewPost(post: Post): Promise<DocumentReference<DocumentData>> {
    return this.firestoreService.create(this.postsCollection, post);
  }

  public getAllPosts(direction: "asc" | "desc" = "asc"): Observable<Post[]> {
    return this.firestoreService.fetchAll<Post>(this.postsCollection, "createAt", direction);
  }

  public fetchPostByUserId(id: string): Observable<Post[]> {
    return this.firestoreService.fetchByProperty<Post>(this.postsCollection, "userId", id);
  }

}
