import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLopComponent } from './dialog-lop.component';

describe('DialogLopComponent', () => {
  let component: DialogLopComponent;
  let fixture: ComponentFixture<DialogLopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogLopComponent]
    });
    fixture = TestBed.createComponent(DialogLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
