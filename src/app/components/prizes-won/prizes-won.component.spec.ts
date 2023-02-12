import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizesWonComponent } from './prizes-won.component';

describe('PrizesWonComponent', () => {
  let component: PrizesWonComponent;
  let fixture: ComponentFixture<PrizesWonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizesWonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizesWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
