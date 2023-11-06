import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinGiangvienComponent } from './thongtin-giangvien.component';

describe('ThongtinGiangvienComponent', () => {
  let component: ThongtinGiangvienComponent;
  let fixture: ComponentFixture<ThongtinGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongtinGiangvienComponent]
    });
    fixture = TestBed.createComponent(ThongtinGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
