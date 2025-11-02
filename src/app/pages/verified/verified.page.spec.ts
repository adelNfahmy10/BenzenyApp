import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifiedPage } from './verified.page';

describe('VerifiedPage', () => {
  let component: VerifiedPage;
  let fixture: ComponentFixture<VerifiedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
