import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnizoriComponent } from './furnizori';

describe('FurnizoriComponent', () => {
  let component: FurnizoriComponent;
  let fixture: ComponentFixture<FurnizoriComponent>;  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FurnizoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnizoriComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
