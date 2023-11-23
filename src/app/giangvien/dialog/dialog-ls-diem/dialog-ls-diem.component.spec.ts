import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLsDiemComponent } from './dialog-ls-diem.component';

describe('DialogLsDiemComponent', () => {
  let component: DialogLsDiemComponent;
  let fixture: ComponentFixture<DialogLsDiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogLsDiemComponent]
    });
    fixture = TestBed.createComponent(DialogLsDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
