import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPhotoBottomSheetComponent } from './select-photo-bottom-sheet.component';

describe('SelectPhotoBottomSheetComponent', () => {
  let component: SelectPhotoBottomSheetComponent;
  let fixture: ComponentFixture<SelectPhotoBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPhotoBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPhotoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
