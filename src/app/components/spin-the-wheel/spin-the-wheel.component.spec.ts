import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinTheWheelComponent } from './spin-the-wheel.component';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinTheWheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinTheWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
