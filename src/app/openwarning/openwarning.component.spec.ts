import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenwarningComponent } from './openwarning.component';

describe('OpenwarningComponent', () => {
  let component: OpenwarningComponent;
  let fixture: ComponentFixture<OpenwarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenwarningComponent]
    });
    fixture = TestBed.createComponent(OpenwarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
