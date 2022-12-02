import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import * as firebase from "firebase/firestore";
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { PostComment } from 'src/app/models/post.comment.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  private postCommentsCollection: CollectionReference<DocumentData>;
  commentForm!: FormGroup;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();
  comment: PostComment = { comment: '', userId: '', userFullname: '', createAt: this.createdAt };

  constructor(
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private formBuilder: FormBuilder,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {
    this.postCommentsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.POSTS}/${this.data}/PostComments`);
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  onComment(): void {
    this.comment.comment = this.commentForm.controls['comment'].value;
    // TODO: Get the connected user details
    this.comment.userFullname = 'John Doe';
    this.comment.userId = localStorage.getItem('userId')!;
    this.firestoreService.create(this.postCommentsCollection, this.comment).then(
      () => this.commentForm.setValue({ comment: '' })
    );
  }

}
