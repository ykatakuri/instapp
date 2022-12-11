import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { collection, CollectionReference, docData, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { keyValuesToMap } from '@angular/flex-layout/extended/style/style-transforms';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AppPost } from 'src/app/models/app-post.interface';
import { AppUser } from 'src/app/models/app-user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostsService } from 'src/app/services/posts.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';

import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private usersCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;
  public myAngularQrCodeData: string = "";

  public currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: "",
    subs: []
  }

  public friends : AppUser[] = [];

  public ownPosts : AppPost[] = [];

  constructor(
    private postService: PostsService,
    private authenticationService: AuthenticationService,
    private firestore: Firestore,
    private firestoreService: FirestoreService
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
          this.firestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", user.email).subscribe(res => {
            this.currentUser = res[0];
            this.myAngularQrCodeData = this.currentUser.id;
            console.log("Current User", this.currentUser)
            this.fetchOwnPosts(res[0].id).subscribe(r => {
              this.ownPosts = r;
            })
          })
          console.log("Friends in profile", this.friends)
        }
      } else {
      }
    });

  }

  logOut(){
    this.authenticationService.signOut()
  }

  public fetchByDocumentReference<T>(documentReference: DocumentReference): Observable<T> {
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  public fetchUserById(id: string): Observable<AppUser> {
    return this.firestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public fetchUserByEmail(email: string): Observable<AppUser> {
    return this.firestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }

  private fetchOwnPosts(idUser: string): Observable<AppPost[]>{
    return this.firestoreService.fetchByProperty<AppPost>(this.postsCollection, "idUser",idUser, 10);
  }

}
