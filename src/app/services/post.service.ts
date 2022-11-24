import { Injectable } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";
import { CollectionReference, DocumentData, AggregateField, AggregateQuerySnapshot, query, orderBy, DocumentReference, collection } from "firebase/firestore";
import { EMPTY, Observable, of } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { AppPost } from "../models/app-post.interface";
import { Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})

export class PostService {

  private postsCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService,
    private genericStorageService: GenericStorageService,
    ) {
    this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
  }

  public fetchPosts(direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.genericFirestoreService.fetchAll<AppPost>(this.postsCollection, "title", direction);
  }

  // public fetchFriendsPosts(direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
  public fetchPostsById(id : string, direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.genericFirestoreService.fetchAll<AppPost>(this.postsCollection, "title", direction);
  }

  public fetchPostsByUserId(id : string, direction: "asc" | "desc" = "asc"): Observable<AppPost[]> {
    return this.genericFirestoreService.fetchByProperty(this.postsCollection, "idUser", id, 10);
  }

}
