import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSinhvienComponent } from './dialog-sinhvien.component';

describe('DialogSinhvienComponent', () => {
  let component: DialogSinhvienComponent;
  let fixture: ComponentFixture<DialogSinhvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSinhvienComponent]
    });
    fixture = TestBed.createComponent(DialogSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
