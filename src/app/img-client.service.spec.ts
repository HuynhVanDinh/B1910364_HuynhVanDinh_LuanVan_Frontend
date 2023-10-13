import { TestBed } from '@angular/core/testing';

import { ImgClientService } from './img-client.service';

describe('ImgClientService', () => {
  let service: ImgClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
