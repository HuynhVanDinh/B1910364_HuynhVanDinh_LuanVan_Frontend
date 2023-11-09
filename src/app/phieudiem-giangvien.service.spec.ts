import { TestBed } from '@angular/core/testing';

import { PhieudiemGiangvienService } from './phieudiem-giangvien.service';

describe('PhieudiemGiangvienService', () => {
  let service: PhieudiemGiangvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieudiemGiangvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
