import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

import * as firebase from "firebase/firestore";

@Component({
  selector: 'app-create-post-file',
  templateUrl: './create-post-file.component.html',
  styleUrls: ['./create-post-file.component.scss']
})
export class CreatePostFileComponent implements OnInit {
  postFileForm!: FormGroup;
  selectedImage!: File;
  firestore!: Firestore;
  currentUserId!: string;
  createdAt: firebase.Timestamp = firebase.Timestamp.now();

  buildPost(post: Post): Post { return post };

  constructor(
    private userService: UsersService,
    private postService: PostsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<CreatePostFileComponent>
  ) { }

  ngOnInit(): void {
    this.postFileForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      file: [null, Validators.required],
    });
  }

  onImageSelected(fileSelector: any): void {
    this.selectedImage = fileSelector.files[0];
    if (!this.selectedImage) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImage);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result!.toString();
        let previewImage = <HTMLImageElement>document.getElementById('preview-image');
        previewImage.src = readableString;
      }
    );
  }

  onSubmitForm(): void {
    let postTitle = this.postFileForm.controls['title'].value;
    let postDate = Date.now();
    const imagePath = `${FIREBASE_COLLECTION_PATHS.POSTS}_${postDate}`;

    this.storageService.uploadFile(this.selectedImage, imagePath).then(
      () => {
        let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
        return downloadUrl;
      }).then(
        (response) => {
          let post = this.buildPost({
            userId: localStorage.getItem('userId')!,
            title: postTitle,
            imageUrl: response,
            likeCount: 0,
            createAt: this.createdAt,
          });

          this.postService.addNewPost(post);
        }
      ).catch(error => console.log(error));

    this.bottomSheetRef.dismiss();
  }

}
