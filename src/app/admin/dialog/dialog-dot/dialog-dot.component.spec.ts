import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDotComponent } from './dialog-dot.component';

describe('DialogDotComponent', () => {
  let component: DialogDotComponent;
  let fixture: ComponentFixture<DialogDotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDotComponent]
    });
    fixture = TestBed.createComponent(DialogDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
