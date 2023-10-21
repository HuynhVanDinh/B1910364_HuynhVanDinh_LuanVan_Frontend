import { TestBed } from '@angular/core/testing';

import { ThoigianDangkyService } from './thoigian-dangky.service';

describe('ThoigianDangkyService', () => {
  let service: ThoigianDangkyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoigianDangkyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
