import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MucDanhgiaGiangvienComponent } from './muc-danhgia-giangvien.component';

describe('MucDanhgiaGiangvienComponent', () => {
  let component: MucDanhgiaGiangvienComponent;
  let fixture: ComponentFixture<MucDanhgiaGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MucDanhgiaGiangvienComponent]
    });
    fixture = TestBed.createComponent(MucDanhgiaGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
