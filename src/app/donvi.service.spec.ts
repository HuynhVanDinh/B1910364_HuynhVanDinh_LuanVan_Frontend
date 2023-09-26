import { TestBed } from '@angular/core/testing';

import { DonviService } from './donvi.service';

describe('DonviService', () => {
  let service: DonviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
