import { TestBed } from '@angular/core/testing';

import { DanhgiaSinhvienService } from './danhgia-sinhvien.service';

describe('DanhgiaSinhvienService', () => {
  let service: DanhgiaSinhvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhgiaSinhvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
