import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemSinhvienComponent } from './diem-sinhvien.component';

describe('DiemSinhvienComponent', () => {
  let component: DiemSinhvienComponent;
  let fixture: ComponentFixture<DiemSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiemSinhvienComponent]
    });
    fixture = TestBed.createComponent(DiemSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
