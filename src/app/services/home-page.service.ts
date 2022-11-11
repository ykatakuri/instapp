import { Injectable } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";
import { CollectionReference, DocumentData, query, orderBy, DocumentReference, collection, Firestore } from "firebase/firestore";
import { EMPTY, Observable, of } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { AppPost } from "../models/app-post.interface";

@Injectable({
  providedIn: 'root',
})

export class HomePageService {

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

}
