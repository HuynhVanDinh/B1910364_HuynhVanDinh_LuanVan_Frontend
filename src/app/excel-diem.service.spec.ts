import { TestBed } from '@angular/core/testing';

import { ExcelDiemService } from './excel-diem.service';

describe('ExcelDiemService', () => {
  let service: ExcelDiemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelDiemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
