// import { Injectable } from '@angular/core';
// import { addDoc, collectionData, doc, Firestore, orderBy, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
// import { collection } from '@firebase/firestore';
// import { concatMap, map, Observable, take } from 'rxjs';
// import { AppUser } from '../models/app.user.interface';
// import { Chat, Message } from '../models/chat.interface';
// import { UsersService } from './users.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatsService {

//   constructor(
//     private firestore: Firestore,
//     private usersService: UsersService
//   ) { }

//   get currentUserChats(): Observable<Chat[]> {
//     const ref = collection(this.firestore, 'chats');
//     return this.usersService.currentUserProfile.pipe(
//       concatMap((user) => {
//         const myQuery = query(
//           ref,
//           where('userIds', 'array-contains', user?.id)
//         );
//         return collectionData(myQuery, { idField: 'id' }).pipe(
//           map((chats: any) => this.addChatNameAndPicture(user?.id, chats))
//         ) as Observable<Chat[]>;
//       })
//     );
//   }

//   createChat(otherUser: AppUser): Observable<string> {
//     const ref = collection(this.firestore, 'chats');
//     return this.usersService.currentUserProfile.pipe(
//       take(1),
//       concatMap((user) =>
//         addDoc(ref, {
//           userIds: [user?.id, otherUser?.id],
//           users: [
//             {
//               fullname: user?.fullname ?? '',
//               photoURL: user?.photoURL ?? '',
//             },
//             {
//               fullname: otherUser.fullname ?? '',
//               photoURL: otherUser.photoURL ?? '',
//             },
//           ],
//         })
//       ),
//       map((ref) => ref.id)
//     );
//   }

//   addChatNameAndPicture(currentUserId: string | undefined, chats: Chat[]): Chat[] {
//     chats.forEach((chat: Chat) => {
//       const otherUserIndex =
//         chat.userIds.indexOf(currentUserId ?? '') === 0 ? 1 : 0;
//       const { fullname, photoURL } = chat.users[otherUserIndex];
//       chat.chatName = fullname;
//       chat.chatPicture = photoURL;
//     });

//     return chats;
//   }

//   addChatMessage(chatId: string, message: string): Observable<any> {
//     const reference = collection(this.firestore, 'chats', chatId, 'messages');
//     const chatRefence = doc(this.firestore, 'chats', chatId);
//     const sentDate = Timestamp.fromDate(new Date());
//     return this.usersService.currentUserProfile.pipe(
//       take(1),
//       concatMap((user) =>
//         addDoc(reference, {
//           text: message,
//           senderId: user?.id,
//           sentDate: sentDate,
//         })
//       ),
//       concatMap(() =>
//         updateDoc(chatRefence, { lastMessage: message, lastMessageDate: sentDate })
//       ),
//     );
//   }

//   getChatMessages$(chatId: string): Observable<Message[]> {
//     const reference = collection(this.firestore, 'chats', chatId, 'messages');
//     const queryAll = query(reference, orderBy('sentDate', 'asc'));
//     return collectionData(queryAll) as Observable<Message[]>;
//   }

//   isExistingChat(otherUserId: string): Observable<string | null> {
//     return this.currentUserChats.pipe(
//       take(1),
//       map((chats) => {
//         for (let i = 0; i < chats.length; i++) {
//           if (chats[i].userIds.includes(otherUserId)) {
//             return chats[i].id;
//           }
//         }

//         return null;
//       })
//     );
//   }
// }
