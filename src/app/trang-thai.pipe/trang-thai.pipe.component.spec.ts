import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangThaiPipeComponent } from './trang-thai.pipe.component';

describe('TrangThaiPipeComponent', () => {
  let component: TrangThaiPipeComponent;
  let fixture: ComponentFixture<TrangThaiPipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrangThaiPipeComponent]
    });
    fixture = TestBed.createComponent(TrangThaiPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
