import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CollectionReference, DocumentData, collection, query, where, getDocs, Query, DocumentReference, doc, orderBy, setDoc, updateDoc } from 'firebase/firestore';
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
    isFriend: Boolean = false;
    isInvited: Boolean = false;
    isSubbed: Boolean = false;
    friendStatus: string = "";

    private currentUser : AppUser = {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      picture: "",
      subs: []
    }
    users: AppUser[] = [];
    searchedUser : any;
    searchElem: string = "";
    private usersCollection: CollectionReference<DocumentData>;
    private friendsCollection: CollectionReference<DocumentData>;
    private notifCollection: CollectionReference<DocumentData>;

  constructor(
    private firestoreService: FirestoreService,
     private firestore: Firestore,
     private snackBar: MatSnackBar
     ) {

    this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
    this.friendsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.FRIENDS);
    this.notifCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.NOTIFICATION);
  }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if(user.email != null && user.uid != null){
          this.firestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", user.email).subscribe(res => {
            this.currentUser = res[0];
            for(var i = 0; i < res[0].subs.length; i++){
              this.fetchByDocumentReference<AppUser>(res[0].subs[i]).subscribe(r=> {
                  this.friends.push(r);
              })
            }
          })
        }
      } else {
      }
    });
  }

  async search(){
    this.users = [];
    const querySnapshot = await getDocs(query(this.usersCollection, where("email", "==", this.searchElem)));
    querySnapshot.forEach((doc) => {
      this.users[0] = (doc.data()) as AppUser;
      this.users[0].id = doc.id
      this.checkIfFriendsExists(doc.id)
});

  }

  private checkIfFriendsExists(id: string){

    this.isSubbed = false;
    this.isSubbed = this.currentUser.subs.some(elem => elem.id == id);
    return this.currentUser.subs.some(elem => elem.id == id);

      // this.isFriend = false;
      // this.friendStatus = "";
      // let iDoc = doc(this.firestore, "user", id)
      // let currentDoc = doc(this.firestore, "user", this.currentUser.id)
      // const askerRequest = query(this.friendsCollection, where("receiver", "==", iDoc), where("asker", "==", currentDoc));
      // const receiverRequest = query(this.friendsCollection, where("asker", "==", iDoc), where("receiver", "==", currentDoc));
      //   const askerresult = collectionData(askerRequest, { idField: "id" }) as Observable<Friends[]>;
      //   await askerresult.subscribe(res => {
      //   if(res.length > 0){
      //     console.log('res asker', res)
      //     this.isFriend = true;
      //     res[0].accepted == true ? this.friendStatus = "Vous êtes amis" : this.friendStatus = "Demande envoyée";
      //     console.log("this.friendStatus ", this.friendStatus)
      //   }
      // })
      // const receiverResult = collectionData(receiverRequest, { idField: "id" }) as Observable<Friends[]>;
      // await receiverResult.subscribe(res => {
      //   if(res.length > 0){
      //     console.log('res receiver', res)
      //     this.isFriend = true;
      //     // this.isFriend = res[0].accepted == true ? true : false;
      //     res[0].accepted == true ? this.friendStatus = "Vous êtes amis" : this.friendStatus = "Vous n'avez pas acceptée la demande"
      //     console.log("this.friendStatus ", this.friendStatus)
      //   }
      // })
  }

  public fetchUserByEmail(email: string): Observable<AppUser> {
    return this.firestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }

  public fetchByDocumentReference<T>(documentReference: DocumentReference): Observable<T> {
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  async sub(userId: string){

    let docdoc = doc(this.firestore,"user",userId)
    this.currentUser.subs.push(docdoc)
    const documentReference = doc(this.firestore, "user", this.currentUser.id);
    await updateDoc(documentReference, { ...this.currentUser });
    this.checkIfFriendsExists(userId);

    // let relation: Friends={
    //   asker: doc(this.firestore, "user", this.currentUser.id),
    //   receiver: doc(this.firestore, "user", userId),
    //   accepted: false,
    // }
    // console.log("newFriends", relation);
    // await this.firestoreService.create(this.friendsCollection,relation).then(r => {
    //   let newNotif: AppNotification={
    //     refId : doc(this.firestore, "friends", r.id),
    //     userId: doc(this.firestore, "user", userId),
    //     refType:"friends",
    //     text: this.currentUser.firstname + " " + this.currentUser.lastname + " vous suit désormais",
    //     status:1
    //   }
    //   this.firestoreService.create(this.notifCollection,newNotif).then(res => {console.log("notf created?",res)});
    // });

    // let docdoc = doc(this.firestore,"users",userId)
    // this.currentUser.friends.push(docdoc)
    // const documentReference = doc(this.firestore, "user", this.currentUser.id);
    // updateDoc(documentReference, { ...this.currentUser });

  // }

 }
}
