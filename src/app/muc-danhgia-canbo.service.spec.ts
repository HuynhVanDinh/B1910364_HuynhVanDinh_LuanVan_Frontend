import { TestBed } from '@angular/core/testing';

import { MucDanhgiaCanboService } from './muc-danhgia-canbo.service';

describe('MucDanhgiaCanboService', () => {
  let service: MucDanhgiaCanboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MucDanhgiaCanboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
