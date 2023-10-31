import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongviecTuanComponent } from './congviec-tuan.component';

describe('CongviecTuanComponent', () => {
  let component: CongviecTuanComponent;
  let fixture: ComponentFixture<CongviecTuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongviecTuanComponent]
    });
    fixture = TestBed.createComponent(CongviecTuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
