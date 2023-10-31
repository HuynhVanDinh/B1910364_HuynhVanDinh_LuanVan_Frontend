import { TestBed } from '@angular/core/testing';

import { KetquaService } from './ketqua.service';

describe('KetquaService', () => {
  let service: KetquaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KetquaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
