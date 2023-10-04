import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkiCoquanComponent } from './dangki-coquan.component';

describe('DangkiCoquanComponent', () => {
  let component: DangkiCoquanComponent;
  let fixture: ComponentFixture<DangkiCoquanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangkiCoquanComponent]
    });
    fixture = TestBed.createComponent(DangkiCoquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
