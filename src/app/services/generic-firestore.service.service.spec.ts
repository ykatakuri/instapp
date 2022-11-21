import { TestBed } from '@angular/core/testing';

import { GenericFirestoreServiceService } from './generic-firestore.service.service';

describe('GenericFirestoreServiceService', () => {
  let service: GenericFirestoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericFirestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
