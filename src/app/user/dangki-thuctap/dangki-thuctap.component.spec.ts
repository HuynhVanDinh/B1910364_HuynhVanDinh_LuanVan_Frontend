import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkiThuctapComponent } from './dangki-thuctap.component';

describe('DangkiThuctapComponent', () => {
  let component: DangkiThuctapComponent;
  let fixture: ComponentFixture<DangkiThuctapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangkiThuctapComponent]
    });
    fixture = TestBed.createComponent(DangkiThuctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
