import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTransactionsComponent } from './team-transactions.component';

describe('TeamTransactionsComponent', () => {
  let component: TeamTransactionsComponent;
  let fixture: ComponentFixture<TeamTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
