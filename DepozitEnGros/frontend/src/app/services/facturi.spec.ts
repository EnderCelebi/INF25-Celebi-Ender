import { TestBed } from '@angular/core/testing';

import { FacturiService } from './facturi';

describe('FacturiService', () => {
  let service: FacturiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
