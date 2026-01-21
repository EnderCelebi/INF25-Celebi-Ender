import { TestBed } from '@angular/core/testing';
import { CategoriiService } from './categorii.js';

describe('CategoriiService', () => {
  let service: CategoriiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
