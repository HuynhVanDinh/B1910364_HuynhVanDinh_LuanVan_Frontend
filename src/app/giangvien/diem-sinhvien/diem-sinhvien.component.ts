import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PhieudiemGiangvienService } from 'src/app/phieudiem-giangvien.service';

@Component({
  selector: 'app-diem-sinhvien',
  templateUrl: './diem-sinhvien.component.html',
  styleUrls: ['./diem-sinhvien.component.css'],
})
export class DiemSinhvienComponent implements OnInit {
  elements!: any;
  tableData: any[] = [];
  listBieuMau: any[] = [];
  myForm!: FormGroup;
  diem!: Float32Array;
  tongDiem = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private phiemDiemGiangVienService: PhieudiemGiangvienService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.elements = history.state.element;
      console.log('Received element on target page:', this.elements);
    });
  }
  ngOnInit(): void {
    this.getBieuMauByKhoa();
  }
  tinhTongDiem() {
    this.tongDiem = 0;

    for (const item of this.listBieuMau) {
      const controlName = 'diem' + item.maPDGV;
      const control = this.myForm.get(controlName);
      if (control && control.valid) {
        this.tongDiem += control.value;
      }
    }

    this.tongDiem = parseFloat(this.tongDiem.toFixed(2));
  }

  getTotalMaxScoreForSection(sectionName: string): number {
    const itemsInSection = this.listBieuMau.filter(
      (item) => item.mucDG.tenMuc === sectionName
    );
    return itemsInSection.reduce((total, item) => total + item.diemMax, 0);
  }
  getTotalMaxScoreForAllSections(): number {
    const total = this.listBieuMau.reduce(
      (sum, item) => sum + parseFloat(item.diemMax),
      0
    );
    return parseFloat(total.toFixed(2)); // Round to 2 decimal places
  }

  getBieuMauByKhoa() {
    this.phiemDiemGiangVienService
      .getByKhoa(this.elements.giangVien.khoa.khoaId)
      .subscribe((res) => {
        console.log(res);
        this.listBieuMau = res;
        this.myForm = this.fb.group({});

        // Sử dụng một vòng lặp để thêm các FormControl động vào FormGroup
        for (let j = 0; j < this.listBieuMau.length; j++) {
          // console.log(this.listBieuMau[j].maPDCB);
          this.myForm.addControl(
            `diem${this.listBieuMau[j].maPDGV}`,
            new FormControl(null, [
              Validators.required,
              Validators.min(0.1),
              Validators.max(this.listBieuMau[j].diemMax),
            ])
          );
        }
      });
  }
}
