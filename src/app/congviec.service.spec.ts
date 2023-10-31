import { TestBed } from '@angular/core/testing';

import { CongviecService } from './congviec.service';

describe('CongviecService', () => {
  let service: CongviecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongviecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
