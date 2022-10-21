import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from "@angular/fire/auth";
import { EMPTY, Observable, of } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public user: Observable<User | null> = EMPTY;
  constructor(private readonly auth: Auth) {
    if (this.auth) {
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
      const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password); const displayName: string = `${lastname.toLocaleUpperCase()} ${firstname}`;
      await updateProfile(data.user, { displayName });
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
}