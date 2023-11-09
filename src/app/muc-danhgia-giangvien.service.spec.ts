import { TestBed } from '@angular/core/testing';

import { MucDanhgiaGiangvienService } from './muc-danhgia-giangvien.service';

describe('MucDanhgiaGiangvienService', () => {
  let service: MucDanhgiaGiangvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MucDanhgiaGiangvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
