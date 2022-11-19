import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { CreatePostCameraComponent } from '../create-post-camera/create-post-camera.component';
import { CreatePostFileComponent } from '../create-post-file/create-post-file.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  trigger: Subject<void> = new Subject();
  stream: any = null;
  previewImage: string = '';
  takeSnapButtonLabel: string = 'Prendre une photo';
  snap!: File;

  constructor(private _storageService: StorageService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openFileForm(): void {
    this._bottomSheet.open(CreatePostFileComponent);
  }

  openCamera(event: MouseEvent): void {
    this.checkPermissions();
    event.preventDefault();
  }

  checkPermissions(): void {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500,
      }
    }).then((res) => {
      this.stream = res;
    }).catch((error) => {
      console.log(error);
    });
  }

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  onCaptureImage(): void { this.trigger.next(); }

  snapshot(event: WebcamImage): void {
    console.log(event);

    this.previewImage = event.imageAsDataUrl;

    this.takeSnapButtonLabel = 'Reprendre la photo';
  }

  onNext(): void {

    const imageName = 'name.jpeg';

    this.snap = new File([new Blob([this.previewImage], { type: 'image/jpeg' })], imageName, { type: 'image/jpeg' });
    this._storageService.uploadFile(this.snap, this.previewImage);
    localStorage.setItem('previewImage', this.previewImage);
    this._bottomSheet.open(CreatePostCameraComponent);
  }



  // dataURItoBlob(dataURI: any) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });
  //   return blob;
  // }

}
