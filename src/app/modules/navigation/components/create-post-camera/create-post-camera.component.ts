import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

import * as firebase from "firebase/firestore";
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-post-camera',
  templateUrl: './create-post-camera.component.html',
  styleUrls: ['./create-post-camera.component.scss']
})
export class CreatePostCameraComponent implements OnInit, OnDestroy {
  photoTakenUrl: string = '';
  previewImage: string = '';
  photoTakenForm!: FormGroup;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();
  post: Post = { id: '', creatorId: '', creatorName: '', title: '', imageUrl: '', likeCount: 0, createAt: this.createdAt };

  currentUserId: any;
  currentUserfullname: any;

  private destroy$!: Subject<boolean>;

  constructor(
    private postService: PostsService,
    private authService: AuthenticationService,
    private bottomSheetRef: MatBottomSheetRef<CreatePostCameraComponent>,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.previewImage = localStorage.getItem('previewImage')!;
    this.photoTakenUrl = this.previewImage;

    this.photoTakenForm = this.formBuilder.group({
      photoTakenTitle: [null, [Validators.required, Validators.minLength(2)]],
    });

    this.authService.user.pipe(
      tap((user) => {
        this.currentUserId = user?.uid;
        this.currentUserfullname = user?.displayName;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  onSaveSnap(): void {
    let title = this.photoTakenForm.controls['photoTakenTitle'].value;
    let url = localStorage.getItem('photoTakenUrl');

    this.post.creatorId = this.currentUserId;
    this.post.creatorName = this.currentUserfullname;
    this.post.title = title;
    this.post.imageUrl = url!;

    Promise.resolve(this.postService.addNewPost(this.post))
      .then(
        (snapshot) => {
          this.post.id = snapshot.id;
          this.postService.updatePost(this.post)
        }
      );

    this.bottomSheetRef.dismiss();
    this.router.navigateByUrl('home');
  }

}
