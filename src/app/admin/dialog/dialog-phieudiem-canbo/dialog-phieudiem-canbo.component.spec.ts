import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPhieudiemCanboComponent } from './dialog-phieudiem-canbo.component';

describe('DialogPhieudiemCanboComponent', () => {
  let component: DialogPhieudiemCanboComponent;
  let fixture: ComponentFixture<DialogPhieudiemCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPhieudiemCanboComponent]
    });
    fixture = TestBed.createComponent(DialogPhieudiemCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
