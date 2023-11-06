import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaThongtinComponent } from './sua-thongtin.component';

describe('SuaThongtinComponent', () => {
  let component: SuaThongtinComponent;
  let fixture: ComponentFixture<SuaThongtinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaThongtinComponent]
    });
    fixture = TestBed.createComponent(SuaThongtinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
