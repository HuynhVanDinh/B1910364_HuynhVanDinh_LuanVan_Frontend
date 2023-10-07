import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetquaThuctapComponent } from './ketqua-thuctap.component';

describe('KetquaThuctapComponent', () => {
  let component: KetquaThuctapComponent;
  let fixture: ComponentFixture<KetquaThuctapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KetquaThuctapComponent]
    });
    fixture = TestBed.createComponent(KetquaThuctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
