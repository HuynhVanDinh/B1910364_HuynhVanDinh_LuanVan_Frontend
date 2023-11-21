import { TestBed } from '@angular/core/testing';

import { DiemCanboService } from './diem-canbo.service';

describe('DiemCanboService', () => {
  let service: DiemCanboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiemCanboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
