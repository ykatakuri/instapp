import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { AppUser } from '../models/app-user.interface';
import { Post } from '../models/post.interface';
import { FirestoreService } from './firestore.service';
import { GenericStorageService } from './generic-storage.service';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private AppUsersCollection: CollectionReference<DocumentData>;
  constructor(
    private readonly firestore: Firestore,
    private readonly firestoreService: FirestoreService,
    private readonly postService: PostsService
  ) {
    this.AppUsersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
  }

  public addNewAppUser(AppUser: AppUser): Promise<DocumentReference<DocumentData>> {
    return this.firestoreService.create(this.AppUsersCollection, AppUser);
  }

  public fetchAppUserById(id: string): Observable<AppUser> {
    return this.firestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public updateAppUser(AppUser: AppUser): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, { id: AppUser.id });
  }

  public updateAppUserWithPost(AppUserId: string, post: Post): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, { id: AppUserId, post: post });
  }

  public fetchAppUserByEmail(email: string): Observable<AppUser> {
    return this.firestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }
}
