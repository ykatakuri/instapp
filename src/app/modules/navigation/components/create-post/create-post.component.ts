import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { CreatePostFileComponent } from '../create-post-file/create-post-file.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, AfterViewInit {
  trigger: Subject<void> = new Subject();
  stream: any = null;
  previewImage: string = '';
  takeSnapButtonLabel: string = 'Prendre une photo';
  photoTaken!: File;
  photoTakenName!: string;
  imageFormat: string = 'image.jpeg';

  @ViewChild("cameraInput") cameraInput!: ElementRef;
  public photo: SafeUrl = "";

  constructor(
    private storageService: StorageService,
    private bottomSheet: MatBottomSheet,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.cameraInput.nativeElement.click();
  }

  public getPhoto(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const objectURL = URL.createObjectURL(target.files[0]);
      this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }

  openFileForm(): void {
    this.bottomSheet.open(CreatePostFileComponent);
  }

  // openCamera(event: MouseEvent): void {
  //   this.checkPermissions();
  //   event.preventDefault();
  // }

  openCamera(event: MouseEvent): void {
    this.cameraInput.nativeElement.click();
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
    // const imagePath = `${FIREBASE_COLLECTION_PATHS.POSTS}_${this.photoTakenName}`;

    // const arr = this.previewImage.split(",");
    // const bstr = window.atob(arr[1]);
    // let n = bstr.length;
    // const u8arr = new Uint8Array(n);
    // while (n--) {
    //   u8arr[n] = bstr.charCodeAt(n);
    // }


    // this.photoTaken = new File([u8arr], this.photoTakenName, { type: this.imageFormat });

    // this.storageService.uploadFile(this.photoTaken, imagePath).then(
    //   () => {
    //     let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
    //     return downloadUrl;
    //   }).then(
    //     (response) => {
    //       localStorage.setItem('photoTakenUrl', response);
    //     }
    //   ).catch(error => console.log(error));

    console.log('photo: ', this.photo);

    // const imagePath = `${FIREBASE_COLLECTION_PATHS.POSTS}_${this.photoTakenName}`;

    // this.photoTaken = new File([u8arr], this.photo.toString(), { type: this.imageFormat });

    // this.storageService.uploadFile(this.photoTaken, imagePath).then(
    //   () => {
    //     let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
    //     return downloadUrl;
    //   }).then(
    //     (response) => {
    //       localStorage.setItem('photoTakenUrl', response);
    //     }
    //   ).catch(error => console.log(error));

    // this.bottomSheet.open(CreatePostCameraComponent);
  }

}
