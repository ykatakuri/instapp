import { Injectable } from '@angular/core';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from '../constants/firestore-collection-paths.constant';
import { Friend } from '../models/friend.interface';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private friendsCollection: CollectionReference<DocumentData>;
  currentUserId: string = window.localStorage.getItem('userId')!;
  path: string = `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`;
  constructor(
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {
    this.friendsCollection = collection(this.firestore, this.path);
  }

  public addFriend(friend: Friend): Promise<void> {
    return this.firestoreService.createWithCustomID(this.friendsCollection, friend, friend.id);
  }

  public getAllFriends(direction: "asc" | "desc" = "desc"): Observable<Friend[]> {
    return this.firestoreService.fetchAll<Friend>(this.friendsCollection, "id", direction);
  }

  // public getUserFriends(id: string, maxResult?: 6): Observable<Friend[]> {
  //   return this.firestoreService.fetchByProperty<Friend>(this.friendsCollection, "creatorId", id, maxResult);
  // }

  public getFriendById(id: string): Observable<Friend> {
    return this.firestoreService.fetchById<Friend>(FIREBASE_COLLECTION_PATHS.POSTS, id);
  }

  public updateFriend(friend: Friend): Promise<void> {
    return this.firestoreService.update(this.path, friend);
  }

  public deleteFriend(id: string) {
    return this.firestoreService.delete(this.path, id);
  }

  public async countFriends(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.firestoreService.count(this.friendsCollection);
  }
}
