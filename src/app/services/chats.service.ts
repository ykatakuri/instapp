import { Injectable } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { concatMap, map, Observable, take } from 'rxjs';
import { AppUser } from '../models/app.user.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private firestore: Firestore,
    private usersService: UsersService
  ) { }

  createChat(otherUser: AppUser): Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.usersService.currentUserProfile.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          userIds: [user?.id, otherUser?.id],
          users: [
            {
              displayName: user?.fullname ?? '',
              photoURL: user?.photoURL ?? '',
            },
            {
              displayName: otherUser.fullname ?? '',
              photoURL: otherUser.photoURL ?? '',
            },
          ],
        })
      ),
      map((ref) => ref.id)
    );
  }
}
