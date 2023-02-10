import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTransactionsComponent } from './individual-transactions.component';

describe('IndividualTransactionsComponent', () => {
  let component: IndividualTransactionsComponent;
  let fixture: ComponentFixture<IndividualTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
