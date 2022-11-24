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

  public myAngularxQrCode: string;

  public config: Object = {
    isAuto: true,
    text: { font: '25px serif' }, // Hiden { font: '0px' },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // Pour la caméra frontale go check : https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia, faut mettre user au lieu de environment
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 }
      }
    }
  };

  constructor(
    private authenticationService: AuthenticationService,
    private firestore: Firestore,
    private genericFirestoreService: GenericFirestoreService,
    ) {
      this.myAngularxQrCode = 'Your QR code data string';
    }

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
