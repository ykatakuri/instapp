import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeCameraComponent } from './native-camera.component';

describe('NativeCameraComponent', () => {
  let component: NativeCameraComponent;
  let fixture: ComponentFixture<NativeCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NativeCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
