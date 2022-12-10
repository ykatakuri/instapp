import { Component, OnInit } from '@angular/core';
import { collection, CollectionReference, DocumentData, Firestore} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { Post } from 'src/app/models/post.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PostsService } from 'src/app/services/posts.service';
import * as firebase from "firebase/firestore";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-single-post-page',
  templateUrl: './single-post-page.component.html',
  styleUrls: ['./single-post-page.component.scss']
})
export class SinglePostPageComponent implements OnInit {

  postTitleInput: string = "";
  editMode: Boolean = false;

  private postCollection: CollectionReference<DocumentData>;

  post$!: Observable<Post>;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();
  post: Post = { id: '', creatorId: '', creatorName: '', title: '', imageUrl: '', likeCount: 0, createAt: this.createdAt };

    //? PARAMS
    id!: string;
    param!: any;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private dialog: MatDialog,
    ) {
      this.postCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.POSTS}/${this.id}/posts`);
    }

  ngOnInit(): void {
    this.param = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.postsService.getPostById(this.id).subscribe(res => {
        this.post = res;
      });
    });
  }

  ngOnDestroy() {
    if (this.param) this.param.unsubscribe();
  }

  delete(post: Post){

    const confirmDialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirm Remove Post',
        message: 'Are you sure to remove the post ' + post.title + ' ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.firestoreService.delete(FIREBASE_COLLECTION_PATHS.POSTS, post.id);
        this.router.navigateByUrl('profile')
      }
    });
  }

  edit(){
    this.editMode = true;
  }

  save(post: Post){
    post.title = (<HTMLInputElement>document.getElementById("postTitle")).value;
    this.firestoreService.update(FIREBASE_COLLECTION_PATHS.POSTS, post)
    this.editMode=false;
  }

}
