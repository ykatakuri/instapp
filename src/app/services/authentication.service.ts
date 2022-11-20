import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from "@angular/fire/auth";
import { uuidv4 } from "@firebase/util";
import { DocumentReference, DocumentData, CollectionReference, collection } from "firebase/firestore";
import { EMPTY, first, last, Observable, of } from "rxjs";
import { AppUser } from "../models/app-user.interface";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { Firestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private usersCollection: CollectionReference<DocumentData>;
  public currentUserId : any = null;
  public user: Observable<User | null> = EMPTY;
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService,
    private readonly genericStorageService: GenericStorageService
    ) {

      this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
    if (this.auth) {
      this.currentUserId = this.auth.currentUser?.uid;
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

      const newUser : AppUser = {
        id: data.user.uid,
        email : email,
        firstname : firstname,
        lastname : lastname,
        picture : ""
      };
      console.log("newUser" + newUser);

      await this.addNewUser(newUser)

      console.log(data)

      const displayName: string = firstname + " " + lastname;

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
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  }


  public async addNewUser(user: AppUser): Promise<DocumentReference<DocumentData>> {
    user.id = uuidv4();
    let res = await this.genericFirestoreService.create(this.usersCollection, user)
    return res;
    }




private uuidv4(): any {
  throw new Error("Function not implemented.");
}

public getCurrentUser(): Observable<User | null>{
  return this.user;
}

// public getCurrentUserId(): string{
//   return this.user;
// }

}
