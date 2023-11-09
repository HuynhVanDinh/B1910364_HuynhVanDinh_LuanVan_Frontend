import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMucGiangvienComponent } from './dialog-muc-giangvien.component';

describe('DialogMucGiangvienComponent', () => {
  let component: DialogMucGiangvienComponent;
  let fixture: ComponentFixture<DialogMucGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMucGiangvienComponent]
    });
    fixture = TestBed.createComponent(DialogMucGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
