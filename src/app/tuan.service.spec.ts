import { TestBed } from '@angular/core/testing';

import { TuanService } from './tuan.service';

describe('TuanService', () => {
  let service: TuanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
