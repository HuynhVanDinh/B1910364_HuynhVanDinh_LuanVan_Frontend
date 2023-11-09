import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMucCanboComponent } from './dialog-muc-canbo.component';

describe('DialogMucCanboComponent', () => {
  let component: DialogMucCanboComponent;
  let fixture: ComponentFixture<DialogMucCanboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMucCanboComponent]
    });
    fixture = TestBed.createComponent(DialogMucCanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
