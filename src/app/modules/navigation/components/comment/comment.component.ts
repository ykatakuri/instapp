import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import * as firebase from "firebase/firestore";
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { PostComment } from 'src/app/models/post.comment.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  private postCommentsCollection: CollectionReference<DocumentData>;
  private destroy$!: Subject<boolean>;
  currentUserFullname: any;
  currenUserId: any;
  commentForm!: FormGroup;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();
  comments$!: Observable<PostComment[]>;
  comment: PostComment = { comment: '', userId: '', userFullname: '', createAt: this.createdAt };

  constructor(
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private formBuilder: FormBuilder,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
    private authService: AuthenticationService,
  ) {
    this.postCommentsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.POSTS}/${this.data}/PostComments`);
  }

  ngOnInit(): void {
    this.comments$ = this.firestoreService.fetchAll<PostComment>(this.postCommentsCollection, 'createAt', 'asc');
    this.destroy$ = new Subject<boolean>();
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.minLength(1)]],
    });

    this.authService.user.pipe(
      tap((user) => {
        this.currentUserFullname = user!.displayName;
        this.currenUserId = user?.uid;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  isCommentCreator(comment: PostComment): boolean {
    if (comment.userId == this.currenUserId) {
      return true;
    }
    return false;
  }

  onComment(): void {
    this.comment.comment = this.commentForm.controls['comment'].value;
    this.comment.userFullname = this.currentUserFullname;
    this.comment.userId = this.currenUserId;
    this.firestoreService.create(this.postCommentsCollection, this.comment).then(
      () => this.commentForm.setValue({ comment: '' })
    ).catch((error) => console.log(error));
  }
}
