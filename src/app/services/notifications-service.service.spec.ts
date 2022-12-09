import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsServiceService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
