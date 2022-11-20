import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

import * as firebase from "firebase/firestore";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-post-camera',
  templateUrl: './create-post-camera.component.html',
  styleUrls: ['./create-post-camera.component.scss']
})
export class CreatePostCameraComponent implements OnInit {
  photoTakenUrl: string = '';
  previewImage: string = '';
  photoTakenForm!: FormGroup;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();

  buildPost(post: Post): Post { return post };

  constructor(
    private userService: UsersService,
    private postService: PostsService,
    private bottomSheetRef: MatBottomSheetRef<CreatePostCameraComponent>,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.previewImage = localStorage.getItem('previewImage')!;
    this.photoTakenUrl = this.previewImage;

    this.photoTakenForm = this.formBuilder.group({
      photoTakenTitle: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  onSaveSnap(): void {
    let title = this.photoTakenForm.controls['photoTakenTitle'].value;
    let url = localStorage.getItem('photoTakenUrl');
    let userId = localStorage.getItem('userId');

    let post = this.buildPost({
      userId: userId!,
      title: title,
      imageUrl: url!,
      likeCount: 0,
      createAt: this.createdAt,
    });

    this.postService.addNewPost(post);

    this.bottomSheetRef.dismiss();
    this.router.navigateByUrl('home');
  }

}
