import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotthuctapComponent } from './dotthuctap.component';

describe('DotthuctapComponent', () => {
  let component: DotthuctapComponent;
  let fixture: ComponentFixture<DotthuctapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotthuctapComponent]
    });
    fixture = TestBed.createComponent(DotthuctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
