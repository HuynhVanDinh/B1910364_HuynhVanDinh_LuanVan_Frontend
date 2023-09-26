import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDonviComponent } from './dialog-donvi.component';

describe('DialogDonviComponent', () => {
  let component: DialogDonviComponent;
  let fixture: ComponentFixture<DialogDonviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDonviComponent]
    });
    fixture = TestBed.createComponent(DialogDonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
