import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { combineLatest, map, Observable, of } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { Friend } from 'src/app/models/friend.interface';
import { Post } from 'src/app/models/post.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

  constructor(
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {

  }

  ngOnInit(): void {
  }

}
