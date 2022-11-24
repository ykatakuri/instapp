import { Component, OnInit } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GenericFirestoreService } from 'src/app/services/generic-firestore.service';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection-paths.constant';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public currentUser : AppUser = {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    picture: ""
  }

  constructor(
    private authenticationService: AuthenticationService,
    private firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService,

    ) { }

  ngOnInit(): void {
      this.fetchUserById(this.authenticationService.currentUserId).subscribe(res => {
        this.currentUser.id = res.id;
        this.currentUser.email = res.email;
        this.currentUser.firstname = res.firstname;
        this.currentUser.lastname = res.lastname;
        this.currentUser.picture = res.picture;
      })

      // console.log("Current User " + this.authenticationService.currentUserId)


  }

  logOut(){
    this.authenticationService.signOut()
  }

  public fetchUserById(id: string): Observable<AppUser> {
    return this.genericFirestoreService.fetchById<AppUser>(FIREBASE_COLLECTION_PATHS.USERS, id);
  }

}
