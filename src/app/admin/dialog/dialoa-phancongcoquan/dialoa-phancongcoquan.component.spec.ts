import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoaPhancongcoquanComponent } from './dialoa-phancongcoquan.component';

describe('DialoaPhancongcoquanComponent', () => {
  let component: DialoaPhancongcoquanComponent;
  let fixture: ComponentFixture<DialoaPhancongcoquanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialoaPhancongcoquanComponent]
    });
    fixture = TestBed.createComponent(DialoaPhancongcoquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
