import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinSinhvienComponent } from './thongtin-sinhvien.component';

describe('ThongtinSinhvienComponent', () => {
  let component: ThongtinSinhvienComponent;
  let fixture: ComponentFixture<ThongtinSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongtinSinhvienComponent]
    });
    fixture = TestBed.createComponent(ThongtinSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
