import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDelTgdkComponent } from './dialog-del-tgdk.component';

describe('DialogDelTgdkComponent', () => {
  let component: DialogDelTgdkComponent;
  let fixture: ComponentFixture<DialogDelTgdkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDelTgdkComponent]
    });
    fixture = TestBed.createComponent(DialogDelTgdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
