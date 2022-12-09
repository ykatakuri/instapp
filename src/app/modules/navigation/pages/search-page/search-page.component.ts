import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CollectionReference, DocumentData, collection, query, where, getDocs, Query, DocumentReference } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GenericStorageService } from 'src/app/services/generic-storage.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

    friends: AppUser[]= [];
    searches: AppUser[]= [];
    private currentUser : AppUser = {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      picture: "",
      friends: []
    }
    users: any[] = [];
    searchElem: string = "";
    private usersCollection: CollectionReference<DocumentData>;

  constructor(
    private firestoreService: FirestoreService,
     private firestore: Firestore,
     private snackBar: MatSnackBar
     ) {
    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
  }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if(user.email != null && user.uid != null){
          this.firestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", user.email).subscribe(res => {
            this.currentUser = res[0];
            console.log("Current User", this.currentUser)
            for(var i = 0; i < res[0].friends.length; i++){
              this.fetchByDocumentReference<AppUser>(res[0].friends[i]).subscribe(r=> {
                  this.friends.push(r);
                console.log("REF", r)
                console.log("FriendList", this.friends)
              })
            }
          })
          console.log("Friends in profile", this.friends)
        }
      } else {
      }
    });

  }


  async search(event: Event){

    const querySnapshot = await getDocs(query(this.usersCollection, where("email", "==", this.searchElem)));
    console.log("QUERYY", querySnapshot)
    querySnapshot.forEach((doc) => {
      this.users[0] = (doc.data());
    console.log(doc.id, " => ", doc.data());
    console.log(this.friends.some(elem => elem.id == doc.id));
});

  }

  public fetchUserByEmail(email: string): Observable<AppUser> {
    return this.firestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }

  public fetchByDocumentReference<T>(documentReference: DocumentReference): Observable<T> {
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

}
