import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThoigianDangkyComponent } from './dialog-thoigian-dangky.component';

describe('DialogThoigianDangkyComponent', () => {
  let component: DialogThoigianDangkyComponent;
  let fixture: ComponentFixture<DialogThoigianDangkyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogThoigianDangkyComponent]
    });
    fixture = TestBed.createComponent(DialogThoigianDangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
