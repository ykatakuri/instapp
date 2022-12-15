import { Injectable } from '@angular/core';
import { CollectionReference, doc, docData, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { AppUser } from '../models/app.user.interface';
import { Post } from '../models/post.interface';
import { AuthenticationService } from './authentication.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCollection: CollectionReference<DocumentData>;
  constructor(
    private readonly firestore: Firestore,
    private readonly firestoreService: FirestoreService,
    private authService: AuthenticationService,
  ) {
    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
  }

  public addUser(user: AppUser): Promise<void> {
    return this.firestoreService.createWithCustomID(this.usersCollection, user, user.id);
  }

  public getAllUsers(direction: "asc" | "desc" = "asc"): Observable<AppUser[]> {
    return this.firestoreService.fetchAll<AppUser>(this.usersCollection, "fullname", direction);
  }

  public getUserById(id: string): Observable<AppUser> {
    return this.firestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public updateUser(user: AppUser): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, user);
  }

  public updateUserWithPost(userId: string, post: Post): Promise<void> {
    return this.firestoreService.update(FIREBASE_COLLECTION_PATHS.USERS, { id: userId, post: post });
  }

  public fetchUserRef(userRef: DocumentReference): Observable<AppUser> {
    return this.firestoreService.fetchByDocumentReference(userRef);
  }

  get currentUserProfile(): Observable<AppUser | null> {
    return this.authService.user.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.usersCollection, user?.uid);
        return docData(ref) as Observable<AppUser>;
      })
    );
  }

}
