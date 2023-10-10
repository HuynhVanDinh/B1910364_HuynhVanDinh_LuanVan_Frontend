import { TestBed } from '@angular/core/testing';

import { DangkiService } from './dangki.service';

describe('DangkiService', () => {
  let service: DangkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
