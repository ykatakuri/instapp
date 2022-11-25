import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, CollectionReference, Timestamp, DocumentData, DocumentReference } from "firebase/firestore";
import { first, Observable } from 'rxjs';
import { HomePageService } from 'src/app/services/home-page.service';
import { AppPost } from 'src/app/models/app-post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppUser } from 'src/app/models/app-user.interface';
import { GenericFirestoreService } from 'src/app/services/generic-firestore.service';
import { PostService } from 'src/app/services/post.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  private usersCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;

  posts$!: Observable<Post[]>;
  user$!: Observable<AppUser>;
  userId!: string;
  username!: string;
  friends: AppUser[] = [];
  posts: AppPost[] = [];
  public currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: "",
    friends: []
  }

  constructor(
    private genericFirestoreService : GenericFirestoreService,
    private postService: PostService,
    private userService: UsersService,
    private firestore: Firestore,

  ) {
    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
      this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
  }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if(user.email != null && user.uid != null){
          this.genericFirestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", user.email).subscribe(res => {
            this.currentUser = res[0];
            for(var i = 0; i < res[0].friends.length; i++){
              this.fetchByDocumentReference<AppUser>(res[0].friends[i]).subscribe(r=> {
                this.friends[i] = r;
                this.postService.fetchPostsByUserId(r.id).subscribe(result => {
                  this.posts.push(...result)
                })
              })
            }
            })
        }
      } else {
      }
    });
  }

  public fetchByDocumentReference<T>(documentReference: DocumentReference): Observable<T> {
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  // getUsername(userId: string): void {
  //   this.userId = userId;
  //   this.user$ = this.userService.fetchUserById(userId);

  //   this.user$.subscribe(
  //     value => this.username = value.fullname,
  //   );
  // }

}
