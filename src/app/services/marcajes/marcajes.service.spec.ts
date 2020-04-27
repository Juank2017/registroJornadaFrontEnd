import { TestBed } from '@angular/core/testing';

import { MarcajesService } from './marcajes.service';

describe('MarcajesService', () => {
  let service: MarcajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
