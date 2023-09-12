import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecktokenComponent } from './checktoken.component';

describe('ChecktokenComponent', () => {
  let component: ChecktokenComponent;
  let fixture: ComponentFixture<ChecktokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecktokenComponent]
    });
    fixture = TestBed.createComponent(ChecktokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
