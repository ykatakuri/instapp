import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, CollectionReference, Timestamp, DocumentData, DocumentReference, query, where } from "firebase/firestore";
import { first, Observable } from 'rxjs';
import { HomePageService } from 'src/app/services/home-page.service';
import { AppPost } from 'src/app/models/app-post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppUser } from 'src/app/models/app-user.interface';
import { PostsService } from 'src/app/services/posts.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';
import { Firestore, doc, docData, collectionData } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.interface';
import { UsersService } from 'src/app/services/users.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  private usersCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;
  private friendsCollection: CollectionReference<DocumentData>;

  friends: string[] = [];
  posts: Post[] = [];
  public currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: "",
    subs: []
  }

  constructor(
    private firestoreService : FirestoreService,
    private postsService: PostsService,
    private userService: UsersService,
    private firestore: Firestore,

  ) {
    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
      this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
      this.friendsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.FRIENDS);
  }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if(user.email != null && user.uid != null){
          this.firestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", user.email).subscribe(res => {
            this.currentUser = res[0];

            this.getPosts();

            })
        }
      }
    });
  }

  private async getPosts(){
    this.posts = [];
    console.log("this.currentUser.subs", this.currentUser.subs)
    for(var i = 0; i < this.currentUser.subs.length; i++){
      this.postsService.fetchPostsByUserId(this.currentUser.subs[i].id,"asc").subscribe(res => {
        this.posts.push(...res);
      })
    }
  //   this.posts = [];
  //   const currentDoc = doc(this.firestore, "user", this.currentUser.id)
  //   console.log("this.currentUser.id", this.currentUser.id);
  //   const askerRequest = query(this.friendsCollection, where("receiver", "==", currentDoc));
  //   const askerResult = collectionData(askerRequest, { idField: "id" }) as Observable<Friends[]>;
  //   await askerResult.subscribe(res => {
  //   for(let i = 0; i < res.length; i++){
  //       this.postsService.fetchPostsByUserId(res[i].asker.id).subscribe(r => {
  //         this.posts.push(...r)
  //         console.log("posts in for asker", this.posts);
  //       })
  //   }
  //   console.log("posts", this.posts);
  // })
  // const receiverRequest = query(this.friendsCollection, where("asker", "==", currentDoc));
  //   const receiverResult = collectionData(receiverRequest, { idField: "id" }) as Observable<Friends[]>;
  //   await receiverResult.subscribe(res => {
  //   for(let i = 0; i < res.length; i++){
  //       this.postsService.fetchPostsByUserId(res[i].asker.id).subscribe(r => {
  //         this.posts.push(...r)
  //         console.log("posts in for receiver", this.posts);
  //       })
  //   }
  //   console.log("posts", this.posts);
  // })
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
