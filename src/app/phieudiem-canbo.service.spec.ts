import { TestBed } from '@angular/core/testing';

import { PhieudiemCanboService } from './phieudiem-canbo.service';

describe('PhieudiemCanboService', () => {
  let service: PhieudiemCanboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieudiemCanboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
