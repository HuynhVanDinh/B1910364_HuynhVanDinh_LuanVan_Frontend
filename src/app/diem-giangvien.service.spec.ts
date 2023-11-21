import { TestBed } from '@angular/core/testing';

import { DiemGiangvienService } from './diem-giangvien.service';

describe('DiemGiangvienService', () => {
  let service: DiemGiangvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiemGiangvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
