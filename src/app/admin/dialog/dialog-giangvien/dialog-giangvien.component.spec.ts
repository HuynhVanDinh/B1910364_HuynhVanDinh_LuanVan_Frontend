import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGiangvienComponent } from './dialog-giangvien.component';

describe('DialogGiangvienComponent', () => {
  let component: DialogGiangvienComponent;
  let fixture: ComponentFixture<DialogGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGiangvienComponent]
    });
    fixture = TestBed.createComponent(DialogGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
