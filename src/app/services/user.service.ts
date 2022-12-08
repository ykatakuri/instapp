import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from "@angular/fire/auth";
import { uuidv4 } from "@firebase/util";
import { DocumentReference, DocumentData, CollectionReference, collection } from "firebase/firestore";
import { EMPTY, first, last, Observable, of, retryWhen } from "rxjs";
import { AppUser } from "../models/app-user.interface";
import { FIREBASE_COLLECTION_PATHS } from "../modules/navigation/constants/firestore-collection-paths.constant";
import { GenericFirestoreService } from "./generic-firestore.service";
import { GenericStorageService } from "./generic-storage.service";
import { Firestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class UserService {

  private usersCollection: CollectionReference<DocumentData>;

  public currentUser: AppUser = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    picture: "",
    friends: []
  };
  constructor(
    private readonly firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService,
    private readonly genericStorageService: GenericStorageService
    ) {

      this.usersCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USERS);
  }


  public async addNewUser(user: AppUser): Promise<DocumentReference<DocumentData>> {
    user.id = uuidv4();
    let res = await this.genericFirestoreService.create(this.usersCollection, user);
    return res;
    }

  private uuidv4(): any {
    throw new Error("Function not implemented.");
  }


  public fetchUserById(id: string): Observable<AppUser> {
    return this.genericFirestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

  public fetchUserByEmail(email: string): Observable<AppUser> {
    return this.genericFirestoreService.fetchByEmail<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, email);
  }



}
