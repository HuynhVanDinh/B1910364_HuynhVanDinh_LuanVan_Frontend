import { TestBed } from '@angular/core/testing';

import { BieumauService } from './bieumau.service';

describe('BieumauService', () => {
  let service: BieumauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BieumauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
