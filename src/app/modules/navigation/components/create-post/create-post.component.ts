import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { StorageService } from 'src/app/services/storage.service';
import { CreatePostCameraComponent } from '../create-post-camera/create-post-camera.component';
import { CreatePostFileComponent } from '../create-post-file/create-post-file.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, AfterViewInit {
  @ViewChild("cameraInput") cameraInput!: ElementRef;
  public photo: SafeUrl = "";

  trigger: Subject<void> = new Subject();
  stream: any = null;
  previewImage: string = '';
  takeSnapButtonLabel: string = 'Prendre une photo';
  photoTaken!: File;
  photoTakenName!: string;
  imageFormat: string = 'image.jpeg';

  constructor(
    private storageService: StorageService,
    private bottomSheet: MatBottomSheet,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.cameraInput.nativeElement.click();
  }

  openFileForm(): void {
    this.bottomSheet.open(CreatePostFileComponent);
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

  public getPhoto(event: Event) : void {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    if (target && target.files && target.files.length > 0) {
      const objectURL = URL.createObjectURL(target.files[0]);
      this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.previewImage = objectURL;
      this.photoTakenName = Date.now().toString();
      this.takeSnapButtonLabel = 'Reprendre la photo';
      console.log("objectUrl : " + objectURL);
      console.log("photo : " + this.photo);
      console.log("previewImage : " + this.previewImage);
    }

  }

  snapshot(event: WebcamImage): void {
    this.previewImage = event.imageAsDataUrl;
    console.log("event.imageAsDataUrl : " + event.imageAsDataUrl);
      this.photoTakenName = Date.now().toString();
      this.takeSnapButtonLabel = 'Reprendre la photo';
  }

  async onNext(): Promise<void> {
    const imagePath = `${FIREBASE_COLLECTION_PATHS.POSTS}_${this.photoTakenName}`;
    let response = await fetch(this.previewImage);
    console.log(response);
    const u8arr = await response.blob();
    console.log(u8arr);

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

    this.bottomSheet.open(CreatePostCameraComponent);
  }

}
