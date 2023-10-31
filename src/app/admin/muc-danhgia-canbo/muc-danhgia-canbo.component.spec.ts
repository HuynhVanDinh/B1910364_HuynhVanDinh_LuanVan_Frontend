import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MucDanhgiaCanboComponent } from './muc-danhgia-canbo.component';

describe('MucDanhgiaCanboComponent', () => {
  let component: MucDanhgiaCanboComponent;
  let fixture: ComponentFixture<MucDanhgiaCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MucDanhgiaCanboComponent]
    });
    fixture = TestBed.createComponent(MucDanhgiaCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
