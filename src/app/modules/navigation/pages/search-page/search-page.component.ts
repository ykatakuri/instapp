import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { user } from '@angular/fire/auth';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CollectionReference, DocumentData, collection, query, where, getDocs, Query, DocumentReference, doc, orderBy, setDoc, updateDoc } from 'firebase/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { DialogConfig } from '@angular/cdk/dialog';
// import { NgxScannerQrcodeService } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  currentUser$ = this.authService.user;
  users$!: Observable<AppUser[]>;

  searchForm!: FormGroup;

  users: AppUser[] = [];
  searchedUser: any;
  searchElem: string = '';
  private usersCollection: CollectionReference<DocumentData>;
  private isClicked!: boolean;

  friends: AppUser[] = [];
  searches: AppUser[] = [];
  isFriend: Boolean = false;
  isInvited: Boolean = false;
  isSubbed: Boolean = false;
  friendStatus: string = '';

  public config: Object = {
    isAuto: false,
    isAlwaysEmit: false,
    isDraw: false,
    text: { font: '0px' }, // Hidden
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // Pour la caméra frontale go check : https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia, faut mettre user au lieu de environment
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
    private firestoreService: FirestoreService,
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {
    this.usersCollection = collection(
      this.firestore,
      FIREBASE_COLLECTION_PATHS.USERS
    );
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [null],
    });

    this.users$ = combineLatest([
      this.usersService.getAllUsers(),
      this.currentUser$,
      this.searchForm.controls['search'].valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([users, user, searchString]) =>
        users.filter(
          (u) =>
            (u.username?.toLowerCase().includes(searchString) &&
              u.id !== user?.uid) ||
            (u.username?.toUpperCase().includes(searchString) &&
              u.id !== user?.uid)
        )
      )
    );
  }

  goToUserProfile(otherUser: AppUser): void {
    this.router.navigate(['/search', otherUser.id]);
  }

  async searchById(action: any, fn: string, id: string) {
    this.isClicked = !this.isClicked;
    action[fn]().subscribe(console.log, console.error);
    this.users = [];
    const querySnapshot = await getDocs(
      query(this.usersCollection, where('id', '==', id))
    );
    querySnapshot.forEach((doc) => {
      this.users[0] = doc.data() as AppUser;
      this.users[0].id = doc.id;
    });
    this.goToUserProfile(this.users[0]);
  }

  public fetchUserById(id: string): Observable<AppUser> {
    return this.firestoreService.fetchById<AppUser>(
      FIREBASE_COLLECTION_PATHS.USERS,
      id
    );
  }

  public fetchByDocumentReference<T>(
    documentReference: DocumentReference
  ): Observable<T> {
    return docData(documentReference, { idField: 'id' }) as Observable<T>;
  }

  public onError(e: any): void {
    alert(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

  searchByEmail(){
      this.firestoreService.fetchByProperty<AppUser>(this.usersCollection, "email",(<HTMLInputElement>document.getElementById("searchInput")).value).subscribe(res => {
        this.goToUserProfile(res[0])
      })
  }
}
