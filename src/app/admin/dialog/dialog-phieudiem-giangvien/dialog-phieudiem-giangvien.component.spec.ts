import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPhieudiemGiangvienComponent } from './dialog-phieudiem-giangvien.component';

describe('DialogPhieudiemGiangvienComponent', () => {
  let component: DialogPhieudiemGiangvienComponent;
  let fixture: ComponentFixture<DialogPhieudiemGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPhieudiemGiangvienComponent]
    });
    fixture = TestBed.createComponent(DialogPhieudiemGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
