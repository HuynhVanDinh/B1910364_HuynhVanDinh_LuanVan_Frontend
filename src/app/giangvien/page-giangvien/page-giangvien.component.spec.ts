import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGiangvienComponent } from './page-giangvien.component';

describe('PageGiangvienComponent', () => {
  let component: PageGiangvienComponent;
  let fixture: ComponentFixture<PageGiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageGiangvienComponent]
    });
    fixture = TestBed.createComponent(PageGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
