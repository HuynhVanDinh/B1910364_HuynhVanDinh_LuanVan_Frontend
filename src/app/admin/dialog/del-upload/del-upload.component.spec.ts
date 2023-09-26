import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUploadComponent } from './del-upload.component';

describe('DelUploadComponent', () => {
  let component: DelUploadComponent;
  let fixture: ComponentFixture<DelUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelUploadComponent]
    });
    fixture = TestBed.createComponent(DelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
