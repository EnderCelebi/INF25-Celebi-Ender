import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenziComponent } from './comenzi';

describe('ComenziComponent', () => {
  let component: ComenziComponent;
  let fixture: ComponentFixture<ComenziComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComenziComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComenziComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
