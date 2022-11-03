import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FormBottomSheetComponent } from '../form-bottom-sheet/form-bottom-sheet.component';

@Component({
  selector: 'app-select-photo-bottom-sheet',
  templateUrl: './select-photo-bottom-sheet.component.html',
  styleUrls: ['./select-photo-bottom-sheet.component.scss']
})
export class SelectPhotoBottomSheetComponent implements OnInit {
  trigger: Subject<void> = new Subject();
  stream: any = null;
  previewImage: string = '';
  takeSnapButtonLabel: string = 'Prendre une photo';

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
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
    localStorage.setItem('previewImage', this.previewImage);
    this._bottomSheet.open(FormBottomSheetComponent);
  }

}
