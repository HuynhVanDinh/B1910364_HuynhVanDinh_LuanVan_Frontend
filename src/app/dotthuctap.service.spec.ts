import { TestBed } from '@angular/core/testing';

import { DotthuctapService } from './dotthuctap.service';

describe('DotthuctapService', () => {
  let service: DotthuctapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotthuctapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
