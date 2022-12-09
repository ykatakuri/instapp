import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitFriendsPageComponent } from './invit-friends-page.component';

describe('InvitFriendsPageComponent', () => {
  let component: InvitFriendsPageComponent;
  let fixture: ComponentFixture<InvitFriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitFriendsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
