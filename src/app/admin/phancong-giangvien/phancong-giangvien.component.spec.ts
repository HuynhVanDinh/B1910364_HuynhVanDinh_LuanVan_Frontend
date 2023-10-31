import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhancongGiangvienComponent } from './phancong-giangvien.component';

describe('PhancongGiangvienComponent', () => {
  let component: PhancongGiangvienComponent;
  let fixture: ComponentFixture<PhancongGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhancongGiangvienComponent]
    });
    fixture = TestBed.createComponent(PhancongGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
