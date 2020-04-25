import { TestBed } from '@angular/core/testing';

import { MarcadoService } from './marcado.service';

describe('MarcadoService', () => {
  let service: MarcadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
