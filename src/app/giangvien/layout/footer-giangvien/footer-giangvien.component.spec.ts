import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGiangvienComponent } from './footer-giangvien.component';

describe('FooterGiangvienComponent', () => {
  let component: FooterGiangvienComponent;
  let fixture: ComponentFixture<FooterGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterGiangvienComponent]
    });
    fixture = TestBed.createComponent(FooterGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
