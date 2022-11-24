import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { keyValuesToMap } from '@angular/flex-layout/extended/style/style-transforms';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AppPost } from 'src/app/models/app-post.interface';
import { AppUser } from 'src/app/models/app-user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GenericFirestoreService } from 'src/app/services/generic-firestore.service';
import { PostService } from 'src/app/services/post.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private usersCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;

  public currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: "",
    friends: []
  }

  public ownPosts : AppPost[] = []

  constructor(
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService

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
            this.fetchOwnPosts(res[0].id).subscribe(r => {
              this.ownPosts = r;
            })
          })

        }
      } else {
      }
    });

  }

  logOut(){
    this.authenticationService.signOut()
  }

  public fetchUserById(id: string): Observable<AppUser> {
    return this.genericFirestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public fetchUserByEmail(email: string): Observable<AppUser> {
    return this.genericFirestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }

  private fetchOwnPosts(idUser: string): Observable<AppPost[]>{
    return this.genericFirestoreService.fetchByProperty<AppPost>(this.postsCollection, "idUser",idUser, 10);
  }

}
