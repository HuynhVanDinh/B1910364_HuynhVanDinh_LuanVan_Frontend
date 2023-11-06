import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGiangvienComponent } from './header-giangvien.component';

describe('HeaderGiangvienComponent', () => {
  let component: HeaderGiangvienComponent;
  let fixture: ComponentFixture<HeaderGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderGiangvienComponent]
    });
    fixture = TestBed.createComponent(HeaderGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
