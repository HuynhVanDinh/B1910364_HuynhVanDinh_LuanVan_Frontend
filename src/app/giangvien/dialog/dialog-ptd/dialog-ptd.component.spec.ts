import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPtdComponent } from './dialog-ptd.component';

describe('DialogPtdComponent', () => {
  let component: DialogPtdComponent;
  let fixture: ComponentFixture<DialogPtdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPtdComponent]
    });
    fixture = TestBed.createComponent(DialogPtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
