import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKhoaComponent } from './dialog-khoa.component';

describe('DialogKhoaComponent', () => {
  let component: DialogKhoaComponent;
  let fixture: ComponentFixture<DialogKhoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogKhoaComponent]
    });
    fixture = TestBed.createComponent(DialogKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
