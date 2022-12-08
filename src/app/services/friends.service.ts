import { Injectable } from '@angular/core';
import { collection, CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { AppUser } from '../models/app.user.interface';
import { Friend } from '../models/friend.interface';
import { AuthenticationService } from './authentication.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private friendsCollection: CollectionReference<DocumentData>;
  currentUserId: string = localStorage.getItem('userId')!;
  constructor(
    private readonly firestore: Firestore,
    private readonly firestoreService: FirestoreService,
    private authService: AuthenticationService,
  ) {
    this.friendsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`);
  }

  public addFriend(friend: Friend): Promise<DocumentReference<DocumentData>> {
    return this.firestoreService.create(this.friendsCollection, friend);
  }

  public getAllFriends(direction: "asc" | "desc" = "asc"): Observable<Friend[]> {
    return this.firestoreService.fetchAll<AppUser>(this.friendsCollection, "fullname", direction);
  }

  public updateFriend(friend: Friend): Promise<void> {
    return this.firestoreService.update(`${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`, friend);
  }

  public deleteFriend(id: string) {
    return this.firestoreService.delete(`${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`, id);
  }
}
