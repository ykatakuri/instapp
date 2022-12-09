import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from "@angular/fire/auth";
import { uuidv4 } from "@firebase/util";
import { DocumentReference, DocumentData, CollectionReference, collection } from "firebase/firestore";
import { EMPTY, first, last, Observable, of, retryWhen } from "rxjs";
import { AppUser } from "../models/app-user.interface";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";
import { FirestoreService } from "./firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { Firestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private usersCollection: CollectionReference<DocumentData>;
  // public currentUserObservable : Observable<AppUser>;
  public currentUserId : any = null;
  public currentUser: AppUser = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    picture: "",
    subs: []
  };
  public user: Observable<User | null> = EMPTY;
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
    private readonly genericStorageService: GenericStorageService,
    private router: Router
    ) {

      this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
    if (this.auth) {
      this.currentUserId = this.auth.currentUser?.uid;

      // if(this.auth.currentUser?.email != null){
      //   this.genericFirestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", this.auth.currentUser.email,1).subscribe(res => {
      //     this.currentUser = res[0];
      //     // console.log("currentuser in auth", this.currentUser);
      //   })
      // }

      this.user = authState(this.auth);
      onAuthStateChanged(this.auth,
        (user: User | null) => {
          this.user = of(user);
          console.log("USER : ", user);
        },
        (error: Error) => { console.log("ERROR : ", error); }
      );
    }
  }

  public async signUp(email: string, password: string, firstname: string, lastname: string): Promise<UserCredential | null> {
    try {
      const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // this.setCurrentUser(data.user.uid, email, firstname, lastname)

      this.currentUserId = data.user.uid;

      const newUser : AppUser = {
        id: data.user.uid,
        email : email,
        firstname : firstname,
        lastname : lastname,
        picture : "",
        subs : []
      };
      console.log("newUser" + newUser);

      await this.addNewUser(newUser);

      console.log(data)

      return data;
    } catch (error) {
      return null;
    }
  }

  public async signIn(email: string, password: string): Promise<UserCredential | null> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: unknown) {
      console.log(error); return null;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.log(error);
    }
  }


  public async addNewUser(user: AppUser): Promise<DocumentReference<DocumentData>> {
    user.id = uuidv4();
    let res = await this.firestoreService.create(this.usersCollection, user);
    return res;
    }




private uuidv4(): any {
  throw new Error("Function not implemented.");
}

// public async getCurrentUser():Promise<AppUser>{


    // return this.genericFirestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", this.auth.currentUser.email,1).pipe(first());
    // })
  // }
  // let user : AppUser = {
  //   id: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   picture: "",
  //   friends: []
  // };
  // if(this.auth.currentUser?.email != null){
  //   this.genericFirestoreService.fetchByProperty<AppUser>(this.usersCollection, "email", this.auth.currentUser.email, 1).subscribe(res => {
  //   console.log("res[0]", res[0]);
  //   this.currentUser = res[0];
  //   user = res[0];
  //   return user;
  // })
  // }
  // else{
  //   return user as unknown as Observable<AppUser>;
  // }
// }


public fetchUserById(id: string): Observable<AppUser> {
  return this.firestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
}

public fetchUserByEmail(email: string): Observable<AppUser> {
  return this.firestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
}

// private setCurrentUser(id: string, email: string, firstname: string, lastname: string){
//   this.currentUser.id = id;
//   this.currentUser.email = email;
//   this.currentUser.firstname = firstname;
//   this.currentUser.lastname = lastname;
// }

// public getCurrentUserId(): string{
//   return this.user;
// }

}
