import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChatComponent } from './liste-chat.component';

describe('ListeChatComponent', () => {
  let component: ListeChatComponent;
  let fixture: ComponentFixture<ListeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
