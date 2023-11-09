import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieudiemGiangvienComponent } from './phieudiem-giangvien.component';

describe('PhieudiemGiangvienComponent', () => {
  let component: PhieudiemGiangvienComponent;
  let fixture: ComponentFixture<PhieudiemGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhieudiemGiangvienComponent]
    });
    fixture = TestBed.createComponent(PhieudiemGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
