import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPdgComponent } from './dialog-pdg.component';

describe('DialogPdgComponent', () => {
  let component: DialogPdgComponent;
  let fixture: ComponentFixture<DialogPdgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPdgComponent]
    });
    fixture = TestBed.createComponent(DialogPdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
