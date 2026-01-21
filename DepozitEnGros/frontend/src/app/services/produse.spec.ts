import { TestBed } from '@angular/core/testing';

import { ProduseService } from './produse';

describe('ProduseService', () => {
  let service: ProduseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
