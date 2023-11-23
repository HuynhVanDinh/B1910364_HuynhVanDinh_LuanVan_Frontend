import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsDiemComponent } from './ls-diem.component';

describe('LsDiemComponent', () => {
  let component: LsDiemComponent;
  let fixture: ComponentFixture<LsDiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LsDiemComponent]
    });
    fixture = TestBed.createComponent(LsDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
