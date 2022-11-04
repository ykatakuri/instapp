import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectPhotoBottomSheetComponent } from '../select-photo-bottom-sheet/select-photo-bottom-sheet.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    localStorage.setItem('previewImage', '');
  }

  openBottomSheet(): void {
    this._bottomSheet.open(SelectPhotoBottomSheetComponent);
  }
}

