import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBottomSheetComponent } from './form-bottom-sheet.component';

describe('FormBottomSheetComponent', () => {
  let component: FormBottomSheetComponent;
  let fixture: ComponentFixture<FormBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
