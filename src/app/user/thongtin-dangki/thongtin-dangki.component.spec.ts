import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinDangkiComponent } from './thongtin-dangki.component';

describe('ThongtinDangkiComponent', () => {
  let component: ThongtinDangkiComponent;
  let fixture: ComponentFixture<ThongtinDangkiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongtinDangkiComponent]
    });
    fixture = TestBed.createComponent(ThongtinDangkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
