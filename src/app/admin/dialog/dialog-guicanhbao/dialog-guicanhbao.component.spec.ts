import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGuicanhbaoComponent } from './dialog-guicanhbao.component';

describe('DialogGuicanhbaoComponent', () => {
  let component: DialogGuicanhbaoComponent;
  let fixture: ComponentFixture<DialogGuicanhbaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGuicanhbaoComponent]
    });
    fixture = TestBed.createComponent(DialogGuicanhbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
