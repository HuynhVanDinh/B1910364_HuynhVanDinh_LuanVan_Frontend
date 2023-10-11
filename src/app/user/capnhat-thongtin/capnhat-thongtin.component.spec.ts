import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatThongtinComponent } from './capnhat-thongtin.component';

describe('CapnhatThongtinComponent', () => {
  let component: CapnhatThongtinComponent;
  let fixture: ComponentFixture<CapnhatThongtinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapnhatThongtinComponent]
    });
    fixture = TestBed.createComponent(CapnhatThongtinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
