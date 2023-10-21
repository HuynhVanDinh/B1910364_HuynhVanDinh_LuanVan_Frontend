import { TestBed } from '@angular/core/testing';

import { DangkyThuctapService } from './dangky-thuctap.service';

describe('DangkyThuctapService', () => {
  let service: DangkyThuctapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkyThuctapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
