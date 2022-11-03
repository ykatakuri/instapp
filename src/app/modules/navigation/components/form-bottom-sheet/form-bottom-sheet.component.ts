import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-form-bottom-sheet',
  templateUrl: './form-bottom-sheet.component.html',
  styleUrls: ['./form-bottom-sheet.component.scss']
})
export class FormBottomSheetComponent implements OnInit {
  imageUrl: string = '';
  previewImage: string = '';

  snapForm!: FormGroup;

  constructor(private _storageService: StorageService, private _bottomSheetRef: MatBottomSheetRef<FormBottomSheetComponent>, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.previewImage = localStorage.getItem('previewImage')!;
    this.imageUrl = this.previewImage;

    this.snapForm = this._formBuilder.group({
      snapTitle: [null],
      snapDescription: [null],
      snapUrl: [this.imageUrl, [Validators.required]],
    });
  }



  onSaveSnap(): void {
    var formValue = this.snapForm.value;
    console.log(formValue);
    var fileName = this.snapForm.controls['snapUrl'].value;

    const file: File = new File([""], fileName);

    // var fileMetaData = this._storageService.getFileMetaData(this.snapForm.controls['snapUrl'].value);
    // var file!: File;

    //this._storageService.uploadFile(file, fileName, file.);
    this._bottomSheetRef.dismiss();
    this._router.navigateByUrl('home');
  }

}
