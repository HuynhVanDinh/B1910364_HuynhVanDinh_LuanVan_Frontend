import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPhancongGiangvienComponent } from './dialog-phancong-giangvien.component';

describe('DialogPhancongGiangvienComponent', () => {
  let component: DialogPhancongGiangvienComponent;
  let fixture: ComponentFixture<DialogPhancongGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPhancongGiangvienComponent]
    });
    fixture = TestBed.createComponent(DialogPhancongGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
