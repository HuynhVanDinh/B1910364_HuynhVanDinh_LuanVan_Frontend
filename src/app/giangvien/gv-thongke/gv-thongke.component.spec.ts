import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvThongkeComponent } from './gv-thongke.component';

describe('GvThongkeComponent', () => {
  let component: GvThongkeComponent;
  let fixture: ComponentFixture<GvThongkeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GvThongkeComponent]
    });
    fixture = TestBed.createComponent(GvThongkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
