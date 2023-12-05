import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDelPdiemCanboComponent } from './dialog-del-pdiem-canbo.component';

describe('DialogDelPdiemCanboComponent', () => {
  let component: DialogDelPdiemCanboComponent;
  let fixture: ComponentFixture<DialogDelPdiemCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDelPdiemCanboComponent]
    });
    fixture = TestBed.createComponent(DialogDelPdiemCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
