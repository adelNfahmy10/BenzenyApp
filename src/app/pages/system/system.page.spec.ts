import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemPage } from './system.page';

describe('SystemPage', () => {
  let component: SystemPage;
  let fixture: ComponentFixture<SystemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
