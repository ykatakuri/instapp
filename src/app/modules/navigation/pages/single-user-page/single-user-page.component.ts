import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { Friend } from 'src/app/models/friend.interface';
import { Post } from 'src/app/models/post.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleUserPageComponent implements OnInit {
  private friendsCollection: CollectionReference<DocumentData>;
  userPosts$!: Observable<Post[]>;
  user$!: Observable<AppUser>;

  //? PARAMS
  id!: string;
  paramSub!: any;

  //* CURRENT USER
  currentUser$!: Observable<AppUser | null>;
  currentUserId: string = localStorage.getItem('userId')!;
  currentUserSub!: any;

  //? FRIEND
  friendSub!: any;
  friendName!: string;
  friendUsername!: string;
  friendPhotoURL!: string;
  friend: Friend = { id: '', fullname: '', username: '', photoURL: '' };
  otherFriend: Friend = { id: '', fullname: '', username: '', photoURL: '' };
  friendsCount!: number;

  // FOLLOW BUTTON
  followButtonLabel!: string;
  followButtonColor!: string;
  isFollowed!: boolean;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private friendsService: FriendsService,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {
    this.friendsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.USERS}/${this.id}/friends`);
    this.getFriendsCount();
  }

  ngOnInit(): void {
    this.followButtonLabel = 'Ajouter comme ami(e)';
    this.followButtonColor = 'primary';
    this.isFollowed = false;
    this.friendsCount = 0;

    this.paramSub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.user$ = this.usersService.getUserById(this.id);
    });

    this.friendSub = this.usersService.getUserById(this.id).subscribe((friend) => {
      this.friendName = friend.fullname!;
      this.friendUsername = friend.username!;
      this.friendPhotoURL = friend.photoURL!;
    });

    this.otherFriend.id = this.currentUserId;

    this.userPosts$ = this.postsService.getUserPosts(this.id);
  }

  ngOnDestroy() {
    if (this.paramSub) this.paramSub.unsubscribe();
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.friendSub) this.friendSub.unsubscribe();
  }

  onFollow(): void {
    this.friend.id = this.id;
    this.friend.fullname = this.friendName;
    this.friend.username = this.friendUsername;
    this.friend.photoURL = this.friendPhotoURL;

    this.isFollowed = !this.isFollowed;

    if (this.isFollowed) {
      this.followButtonLabel = 'Supprimer de la liste des amis(es)';
      this.followButtonColor = 'secondary';
      this.friendsService.addFriend(this.friend)
        .then(() => console.log('friend added'))
        .catch((error) => console.log(error));
      this.friendsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.USERS}/${this.id}/friends`);
      this.firestoreService.createWithCustomID(this.friendsCollection, this.friend, this.currentUserId);
      this.firestoreService.createWithCustomID(this.friendsCollection, this.otherFriend, this.friend.id);
    } else {
      this.followButtonLabel = 'Ajouter comme ami(e)';
      this.followButtonColor = 'primary';
      this.friendsService.deleteFriend(this.id)
        .then(() => console.log('friend deleted'))
        .catch((error) => console.log(error));
    }
  }

  getFriendsCount(): void {
    Promise.resolve(this.friendsService.countFriends())
      .then(
        (snapshot) => {
          let count = snapshot.data().count;
          localStorage.setItem('searchFriendCount', count.toString());
        }
      );
    this.friendsCount = parseInt(localStorage.getItem('searchFriendCount')!);
  }
}
