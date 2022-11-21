import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostFileComponent } from './create-post-file.component';

describe('CreatePostFileComponent', () => {
  let component: CreatePostFileComponent;
  let fixture: ComponentFixture<CreatePostFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
