import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriiComponent } from './categorii';

describe('CategoriiComponent', () => {
  let component: CategoriiComponent;
  let fixture: ComponentFixture<CategoriiComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
