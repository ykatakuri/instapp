import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential, UserInfo } from "@angular/fire/auth";
import { sendPasswordResetEmail } from '@firebase/auth';
import { concatMap, EMPTY, Observable, of } from "rxjs";
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

  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  public async signUp(email: string, password: string, fullname: string, photoUrL: string): Promise<UserCredential | null> {
    try {
      const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const displayName: string = fullname;
      const photoURL: string = photoUrL;
      await updateProfile(data.user, { displayName, photoURL });
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

  public async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.log(error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      window.localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }
}
