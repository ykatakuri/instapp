import { Component, OnInit } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, CollectionReference, doc, DocumentData, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {


  notifsTab: string[] = [];

  private currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: "",
    subs: []
  }

  private notifCollection: CollectionReference<DocumentData>;
  private usersCollection: CollectionReference<DocumentData>;

  friends: any;

  constructor(
    private firestoreService: FirestoreService,
    private firestore: Firestore
    ) {
      this.notifCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.NOTIFICATION);
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
            this.getNotifs();
          })
        }
      }
    });

  }
  fetchByDocumentReference<T>(arg0: any) {
    throw new Error('Method not implemented.');
  }

  private async getNotifs(){
    // this.notifsTab= [];
    // console.log("CURRENT USER IN NOTIF", this.currentUser)
    // let currentDoc = doc(this.firestore, "user", this.currentUser.id)
    // console.log("currentDoc parent", currentDoc.parent)
    // console.log("currentDoc path", currentDoc.path)
    // console.log("currentDoc", currentDoc)
    // const askerRequest = query(this.notifCollection, where("userId", "==", currentDoc));
    //     const result = collectionData(askerRequest, { idField: "id" }) as Observable<AppNotification[]>;
    //     await result.subscribe(res => {
    //       console.log("res query",res)
    //       for(var i = 0; i < res.length; i++){
    //         if(res[i].status < 3){
    //           this.notifsTab.push(res[i])
    //         }
    //       }
    //       // res.forEach(e => {
    //       //   console.log("notif foreach", e)

    //       // })
    //   })
  }

  // async accept(notif: AppNotification){
  //   await this.firestoreService.fetchByDocumentReference<Friends>(notif.refId).subscribe(res => {
  //     console.log("res accepted", res);
  //     let newNotif: AppNotification={
  //       refId : notif.refId,
  //       userId: doc(this.firestore, "user", res.asker.id),
  //       refType:"friendsAccepted",
  //       text: this.currentUser.firstname + " " + this.currentUser.lastname + " a accepté votre invitation",
  //       status:1
  //     }
  //     this.firestoreService.create(this.notifCollection,newNotif).then(e => {
  //       console.log("e response create notif",e)
  //     })
  //   })
  //   let friendsDocData = docData(notif.refId, { idField: "id" }) as Observable<Friends>;
  //  await friendsDocData.subscribe(res => {

  //     let newNotif: AppNotification={
  //       refId : notif.refId,
  //       userId: doc(this.firestore, "user", res.asker.id),
  //       refType:"friends",
  //       text: this.currentUser.firstname + " " + this.currentUser.lastname + " a accepté votre invitation",
  //       status:1
  //     }
  //     this.firestoreService.create(this.notifCollection,newNotif)
      //   res.accepted = true;
      //   const documentReference = doc(this.firestore, "friends", res.id!);
      //   updateDoc(documentReference, { ...res }).then(e => {
      //     this.deleteNotif(notif)
      //   });
      // });

    // })

  // }

  // refuse(notif: AppNotification){
  //   this.closeNotif(notif);
  // }

  // closeNotif(notif : AppNotification){
  //   notif.status = 3;
  //   const notifReference = doc(this.firestore, "notification", notif.id!)
  //   updateDoc(notifReference, { ...notif });
  // }

  // deleteNotif(notif: AppNotification){
  //   this.firestoreService.delete(FIREBASE_COLLECTION_PATHS.NOTIFICATION,"notif.id");
  // }

}
