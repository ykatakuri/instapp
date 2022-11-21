import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { AppUser } from '../models/app-user.interface';
import { Post } from '../models/post.interface';
import { FirestoreService } from './firestore.service';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCollection: CollectionReference<DocumentData>;
  constructor(
    private readonly firestore: Firestore,
    private readonly firestoreService: FirestoreService,
    private readonly postService: PostsService,
  ) {
    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
  }

  public addNewUser(user: AppUser): Promise<DocumentReference<DocumentData>> {
    return this.firestoreService.create(this.usersCollection, user);
  }

  public fetchUserById(id: string): Observable<AppUser> {
    return this.firestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public updateUser(user: AppUser): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, { id: user.id });
  }

  public updateUserWithPost(userId: string, post: Post): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, { id: userId, post: post });
  }
}
