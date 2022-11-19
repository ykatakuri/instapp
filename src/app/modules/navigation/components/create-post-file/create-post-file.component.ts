import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-post-file',
  templateUrl: './create-post-file.component.html',
  styleUrls: ['./create-post-file.component.scss']
})
export class CreatePostFileComponent implements OnInit {
  postFileForm!: FormGroup;
  selectedFile!: File;

  constructor(
    private _formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<CreatePostFileComponent>
  ) { }

  ngOnInit(): void {
    this.postFileForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      file: [null, Validators.required],
    });
  }

  onFileSelected(fileSelector: any): void {
    this.selectedFile = fileSelector.files[0];
    if (!this.selectedFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFile);
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
    console.log(this.postFileForm.value);
    this._bottomSheetRef.dismiss();
  }

}
