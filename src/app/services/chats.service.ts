import { Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { concatMap, map, Observable, take } from 'rxjs';
import { AppUser } from '../models/app.user.interface';
import { Chat } from '../models/chat.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private firestore: Firestore,
    private usersService: UsersService
  ) { }

  get currentUserChats(): Observable<Chat[]> {
    const ref = collection(this.firestore, 'chats');
    return this.usersService.currentUserProfile.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('userIds', 'array-contains', user?.id)
        );
        return collectionData(myQuery, { idField: 'id' }).pipe(
          map((chats: any) => this.addChatNameAndPicture(user?.id, chats))
        ) as Observable<Chat[]>;
      })
    );
  }

  createChat(otherUser: AppUser): Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.usersService.currentUserProfile.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          userIds: [user?.id, otherUser?.id],
          users: [
            {
              fullname: user?.fullname ?? '',
              photoURL: user?.photoURL ?? '',
            },
            {
              fullname: otherUser.fullname ?? '',
              photoURL: otherUser.photoURL ?? '',
            },
          ],
        })
      ),
      map((ref) => ref.id)
    );
  }

  addChatNameAndPicture(currentUserId: string | undefined, chats: Chat[]): Chat[] {
    chats.forEach((chat: Chat) => {
      const otherUserIndex =
        chat.userIds.indexOf(currentUserId ?? '') === 0 ? 1 : 0;
      const { fullname, photoURL } = chat.users[otherUserIndex];
      chat.chatName = fullname;
      chat.chatPicture = photoURL;
    });

    return chats;
  }
}
