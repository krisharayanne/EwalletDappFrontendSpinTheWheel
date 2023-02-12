import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizesToGiveComponent } from './prizes-to-give.component';

describe('PrizesToGiveComponent', () => {
  let component: PrizesToGiveComponent;
  let fixture: ComponentFixture<PrizesToGiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizesToGiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizesToGiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
