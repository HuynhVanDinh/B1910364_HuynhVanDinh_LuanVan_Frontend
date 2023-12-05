import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiemGiangvienService } from 'src/app/diem-giangvien.service';
import { PhieudiemGiangvienService } from 'src/app/phieudiem-giangvien.service';

@Component({
  selector: 'app-dialog-ls-diem',
  templateUrl: './dialog-ls-diem.component.html',
  styleUrls: ['./dialog-ls-diem.component.css'],
})
export class DialogLsDiemComponent implements OnInit {
  isLoading: boolean = false;
  // elements!: any;
  tableData: any[] = [];
  listBieuMau: any[] = [];
  listdiemsv: any[] = [];
  myForm!: FormGroup;
  diem!: Float32Array;
  tongDiem = 0;
  ngOnInit(): void {
    // this.getBieuMauByKhoa();
    this.getDiemSinhvien();
    //  console.log('data', this.data.sinhvien.sinhVien);
  }
  constructor(
    private diemGiangvienService: DiemGiangvienService,
    private phiemDiemGiangVienService: PhieudiemGiangvienService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogLsDiemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  getDiemSinhvien() {
    this.diemGiangvienService
      .getAllBySinhVien(this.data.sinhvien.sinhVien.maSV)
      .subscribe((dataSV) => {
        console.log('diem sv', dataSV, this.data.sinhvien.sinhVien.maSV);
        this.myForm = this.fb.group({});
        this.listBieuMau = dataSV;
        // Sử dụng một vòng lặp để thêm các FormControl động vào FormGroup
        for (let j = 0; j < this.listBieuMau.length; j++) {
          console.log(this.listBieuMau[j]);
          this.myForm.addControl(
            `diem${this.listBieuMau[j].phieuDiemGiangvien.maPDGV}`,
            new FormControl(this.listBieuMau[j].diemGV, [Validators.required])
          );
        }
        this.tinhTongDiem();
      });
  }
  tinhTongDiem() {
    this.tongDiem = 0;

    for (const item of this.listBieuMau) {
      const controlName = 'diem' + item.phieuDiemGiangvien.maPDGV;
      const control = this.myForm.get(controlName);
      if (control && control.valid) {
        this.tongDiem += control.value;
      }
    }

    this.tongDiem = parseFloat(this.tongDiem.toFixed(2));
  }

  getTotalMaxScoreForSection(sectionName: string): number {
    const itemsInSection = this.listBieuMau.filter(
      (item) => item.phieuDiemGiangvien.mucDG.tenMuc === sectionName
    );
    const sum = itemsInSection.reduce(
      (total, item) => total + item.phieuDiemGiangvien.diemMax,
      0
    );
    return parseFloat(sum.toFixed(2));
  }
  getTotalMaxScoreForAllSections(): number {
    const total = this.listBieuMau.reduce(
      (sum, item) => sum + parseFloat(item.phieuDiemGiangvien.diemMax),
      0
    );
    return parseFloat(total.toFixed(2)); // Round to 2 decimal places
  }

  getBieuMauByKhoa() {
    this.phiemDiemGiangVienService
      .getByKhoa(this.data.sinhvien.giangVien.khoa.khoaId)
      .subscribe((res) => {
        console.log('bababab', res);
        // this.listBieuMau = res;
        // this.myForm = this.fb.group({});

        // // Sử dụng một vòng lặp để thêm các FormControl động vào FormGroup
        // for (let j = 0; j < this.listBieuMau.length; j++) {
        //   // console.log(this.listBieuMau[j].maPDCB);
        //   this.myForm.addControl(
        //     `diem${this.listBieuMau[j].maPDGV}`,
        //     new FormControl(null, [
        //       Validators.required,
        //       Validators.min(0),
        //       Validators.max(this.listBieuMau[j].diemMax),
        //     ])
        //   );
        // }
      });
  }
  closedialog() {
    console.log('dasgfskajfga', this.data);
    this.dialogRef.close('Closed using function');
  }
}
