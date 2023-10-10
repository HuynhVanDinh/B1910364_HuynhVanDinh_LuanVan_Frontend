import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkiCuatoiComponent } from './dangki-cuatoi.component';

describe('DangkiCuatoiComponent', () => {
  let component: DangkiCuatoiComponent;
  let fixture: ComponentFixture<DangkiCuatoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangkiCuatoiComponent]
    });
    fixture = TestBed.createComponent(DangkiCuatoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
