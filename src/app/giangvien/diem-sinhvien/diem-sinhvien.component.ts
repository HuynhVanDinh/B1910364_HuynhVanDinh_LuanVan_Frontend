import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiemGiangvienService } from 'src/app/diem-giangvien.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { KetquaService } from 'src/app/ketqua.service';
import { PhieudiemGiangvienService } from 'src/app/phieudiem-giangvien.service';
import { DialogPdgComponent } from '../dialog/dialog-pdg/dialog-pdg.component';
import { DialogPtdComponent } from '../dialog/dialog-ptd/dialog-ptd.component';

@Component({
  selector: 'app-diem-sinhvien',
  templateUrl: './diem-sinhvien.component.html',
  styleUrls: ['./diem-sinhvien.component.css'],
})
export class DiemSinhvienComponent implements OnInit {
  isLoading: boolean = false;
  elements!: any;
  tableData: any[] = [];
  listBieuMau: any[] = [];
  myForm!: FormGroup;
  diem!: Float32Array;
  tongDiem = 0;
  constructor(
    private ketquaService: KetquaService,
    private toastr: ToastrService,
    private giangvienService: GiangvienService,
    private diemGiangVienService: DiemGiangvienService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
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
              Validators.min(0),
              Validators.max(this.listBieuMau[j].diemMax),
            ])
          );
        }
      });
  }
  opendialogptd(data: any): void {
    this.dialog.open(DialogPtdComponent, {
      width: '900px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        sinhvien: data,
        PtdComponent: this,
      },
      disableClose: true,
    });
  }
  opendialogpdg(data: any): void {
    this.dialog.open(DialogPdgComponent, {
      width: '900px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        sinhvien: data,
        PdgComponent: this,
      },
      disableClose: true,
    });
  }
  submitDiem() {
    if (this.myForm.valid) {
      // console.log("hjsgfifgsdjhhhhjftdjivbugukfy lkfl geaewhsdhdmyl")
      const maPDGVValues = [];
      for (const item of this.listBieuMau) {
        const controlName = 'diem' + item.maPDGV;
        const control = this.myForm.get(controlName);
        console.log(control);
        if (control && control.valid) {
          const authToken = localStorage.getItem('authToken');
          if (!authToken) {
            // console.log(authToken);
            console.error('Access token not found. User is not authenticated.');
            return;
          }
          const accountid = localStorage.getItem('accountid');
          this.isLoading = true;
          if (accountid) {
            this.giangvienService
              .getGiangVienByAccount(accountid)
              .subscribe((data) => {
                this.diemGiangVienService
                  .createDiemGiangVien(
                    control.value,
                    item.maPDGV,
                    this.elements.sinhVien.maSV,
                    data.maGV,
                    authToken
                  )
                  .subscribe(() => {
                    // const floatArray: Float32Array = new Float32Array([
                    //   parseFloat(this.tongDiem.toString()),
                    // ]);
                    this.ketquaService
                      .chamDiem(this.elements.maKqtt, this.tongDiem, data.maGV, authToken)
                      .subscribe(
                        () => {
                          this.isLoading = false;
                          this.toastr.success('Chấm điểm thành công');
                          this.snackBar.open('Chấm điểm thành công', 'Đóng', {
                            duration: 3000,
                          });
                          console.log('Chấm điểm thành công');
                        },
                        (error: any) => {
                          this.isLoading = false;
                          this.toastr.error('Lỗi chấm điểm');
                          console.error('Lỗi chấm điểm:', error);
                        }
                      );
                  });
              });
          }
          maPDGVValues.push({
            maPDGV: item.maPDGV,
            value: control.value,
            maSV: this.elements.sinhVien.maSV,
          });
        }
      }
      console.log('Dữ liệu', maPDGVValues);
    } else {
      this.snackBar.open(
        'Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.',
        'Đóng',
        {
          duration: 3000,
        }
      );
    }
  }
}
