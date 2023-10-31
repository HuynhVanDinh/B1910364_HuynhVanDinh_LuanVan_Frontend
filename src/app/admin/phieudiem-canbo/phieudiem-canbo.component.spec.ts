import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieudiemCanboComponent } from './phieudiem-canbo.component';

describe('PhieudiemCanboComponent', () => {
  let component: PhieudiemCanboComponent;
  let fixture: ComponentFixture<PhieudiemCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhieudiemCanboComponent]
    });
    fixture = TestBed.createComponent(PhieudiemCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
