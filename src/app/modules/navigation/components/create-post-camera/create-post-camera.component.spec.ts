import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostCameraComponent } from './create-post-camera.component';

describe('PhotoTakenFormComponent', () => {
  let component: CreatePostCameraComponent;
  let fixture: ComponentFixture<CreatePostCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostCameraComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePostCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
