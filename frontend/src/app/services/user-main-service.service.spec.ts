import { TestBed } from '@angular/core/testing';

import { UserMainServiceService } from './user-main-service.service';

describe('UserMainServiceService', () => {
  let service: UserMainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
