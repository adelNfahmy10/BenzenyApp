import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsDetailsPage } from './transactions-details.page';

describe('TransactionsDetailsPage', () => {
  let component: TransactionsDetailsPage;
  let fixture: ComponentFixture<TransactionsDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
