import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoigianDangkyComponent } from './thoigian-dangky.component';

describe('ThoigianDangkyComponent', () => {
  let component: ThoigianDangkyComponent;
  let fixture: ComponentFixture<ThoigianDangkyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThoigianDangkyComponent]
    });
    fixture = TestBed.createComponent(ThoigianDangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
