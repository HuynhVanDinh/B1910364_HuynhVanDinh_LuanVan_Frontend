import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDelPdiemGiangvienComponent } from './dialog-del-pdiem-giangvien.component';

describe('DialogDelPdiemGiangvienComponent', () => {
  let component: DialogDelPdiemGiangvienComponent;
  let fixture: ComponentFixture<DialogDelPdiemGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDelPdiemGiangvienComponent]
    });
    fixture = TestBed.createComponent(DialogDelPdiemGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
