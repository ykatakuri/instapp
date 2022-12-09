import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPageComponent } from '../../pages/notifications-page/notifications-page.component';
import { CreatePostComponent } from './create-post.component';
describe('NotificationsComponent', () => {
  let component: NotificationsPageComponent;
  let fixture: ComponentFixture<NotificationsPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationsPageComponent);

  });
});
describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
