import { TestBed } from '@angular/core/testing';

import { GetALLClientService } from './get-allclient.service';

describe('GetALLClientService', () => {
  let service: GetALLClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetALLClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
