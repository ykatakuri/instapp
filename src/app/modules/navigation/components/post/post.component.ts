import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { StorageService } from 'src/app/services/storage.service';

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
  photoTaken!: File;
  photoTakenName!: string;
  imageFormat: string = 'image.jpeg';

  constructor(
    private storageService: StorageService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  openFileForm(): void {
    // this.bottomSheet.open(CreatePostFileComponent);
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
    this.previewImage = event.imageAsDataUrl;
    this.photoTakenName = Date.now().toString();
    this.takeSnapButtonLabel = 'Reprendre la photo';
  }

  onNext(): void {
    const imagePath = `${FIREBASE_COLLECTION_PATHS.POSTS}_${this.photoTakenName}`;

    const arr = this.previewImage.split(",");
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    this.photoTaken = new File([u8arr], this.photoTakenName, { type: this.imageFormat });

    this.storageService.uploadFile(this.photoTaken, imagePath).then(
      () => {
        let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
        return downloadUrl;
      }).then(
        (response) => {
          localStorage.setItem('photoTakenUrl', response);
        }
      ).catch(error => console.log(error));

    // this.bottomSheet.open(CreatePostCameraComponent);
  }

}
