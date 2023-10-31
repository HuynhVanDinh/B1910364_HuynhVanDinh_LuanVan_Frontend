import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongviecCuatoiComponent } from './congviec-cuatoi.component';

describe('CongviecCuatoiComponent', () => {
  let component: CongviecCuatoiComponent;
  let fixture: ComponentFixture<CongviecCuatoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongviecCuatoiComponent]
    });
    fixture = TestBed.createComponent(CongviecCuatoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
