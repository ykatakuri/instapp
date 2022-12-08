import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { Friend } from 'src/app/models/friend.interface';
import { Post } from 'src/app/models/post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleUserPageComponent implements OnInit {
  private userFriendsCollection: CollectionReference<DocumentData>;
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

  // FOLLOW BUTTON
  followButtonLabel!: string;
  followButtonColor!: string;
  isFollowed!: boolean;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
    private authService: AuthenticationService,
  ) {
    this.userFriendsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`);
  }

  ngOnInit(): void {
    this.followButtonLabel = 'Ajouter comme ami(e)';
    this.followButtonColor = 'primary';
    this.isFollowed = false;

    this.paramSub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.user$ = this.usersService.getUserById(this.id);
    });

    this.friendSub = this.usersService.getUserById(this.id).subscribe((friend) => {
      this.friendName = friend.fullname!;
      this.friendUsername = friend.username!;
      this.friendPhotoURL = friend.photoURL!;
    });

    this.userPosts$ = this.postsService.getUserPosts(this.id);
  }

  ngOnDestroy() {
    if (this.paramSub) this.paramSub.unsubscribe();
    if (this.currentUserSub) this.currentUserSub.unsubscribe();
    if (this.friendSub) this.friendSub.unsubscribe();
  }

  async onFollow(): Promise<void> {
    this.friend.fullname = this.friendName;
    this.friend.username = this.friendUsername;
    this.friend.photoURL = this.friendPhotoURL;

    this.isFollowed = !this.isFollowed;

    if (this.isFollowed) {
      this.followButtonLabel = 'Supprimer de la liste des amis(es)';
      this.followButtonColor = 'secondary';
      this.firestoreService.create(this.userFriendsCollection, this.friend).then(
        (doc) => {
          this.friend.id = doc.id;
          this.firestoreService.update(
            `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`,
            { id: this.friend.id }
          ).then(
            () => {
              console.log(this.followButtonLabel);
              console.log(this.followButtonColor);
            }
          )
        })
        .catch((error) => console.log(error));
    } else {
      this.followButtonLabel = 'Ajouter comme ami(e)';
      this.followButtonColor = 'primary';
      this.firestoreService.delete(
        `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`,
        this.friend.id!).then(
          () => {
            console.log(this.followButtonLabel);
            console.log(this.followButtonColor);
          })
        .catch((error) => console.log(error));
    }
  }
}
