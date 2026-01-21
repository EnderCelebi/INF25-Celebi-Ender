import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturiComponent } from './facturi';

describe('FacturiComponent', () => {
  let component: FacturiComponent;
  let fixture: ComponentFixture<FacturiComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
