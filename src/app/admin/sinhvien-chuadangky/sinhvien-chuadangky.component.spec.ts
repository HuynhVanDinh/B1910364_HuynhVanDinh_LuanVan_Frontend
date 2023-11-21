import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienChuadangkyComponent } from './sinhvien-chuadangky.component';

describe('SinhvienChuadangkyComponent', () => {
  let component: SinhvienChuadangkyComponent;
  let fixture: ComponentFixture<SinhvienChuadangkyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinhvienChuadangkyComponent]
    });
    fixture = TestBed.createComponent(SinhvienChuadangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
