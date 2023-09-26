import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KhoaService } from 'src/app/khoa.service';
import { LopService } from 'src/app/lop.service';
import { Khoa } from 'src/app/model/khoa.model';
import { Lop } from 'src/app/model/lop.model';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-dialog-sinhvien',
  templateUrl: './dialog-sinhvien.component.html',
  styleUrls: ['./dialog-sinhvien.component.css'],
})
export class DialogSinhvienComponent implements OnInit {
  // khoaNameControl = new FormControl<Number | null>(null, Validators.required);
  lopNameControl = new FormControl<number | null>(null, Validators.required);
  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  maSV!: number;
  email!: string;
  date: Date[] | undefined;
  quequan!: string;
  isLoading: boolean = false;
  isEditMode!: boolean;
  myForm!: FormGroup;
  datas: SinhVien[] = [];
  khoaName!: number;
  tenLop!: number;
  ngaysinh!: Date;
  tenSV!: string;
  isEdit!: boolean;
  danhSachTenKhoa: Khoa[] = [];
  danhSachTenLop: Lop[] = [];
  gender!: string;

  // selectedFile: File | undefined;
  ngOnInit(): void {
    // this.gender = 'Nam';
    // this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
    //   this.danhSachTenKhoa = khoaList;
    // });
    this.lopService.getAllLop().subscribe((lopList: Lop[]) => {
      this.danhSachTenLop = lopList;
    });
    (this.gender = 'Nam'),
      (this.myForm = new FormGroup({
        quequan: new FormControl(),
        email: new FormControl(),
        lopNameControl: new FormControl(),
        ngaysinh: new FormControl(),
        tenSV: new FormControl(),
        gender: new FormControl(),
      }));
    if (this.data.isEdit) {
      this.isEditMode = true;
      // Đặt giá trị cho khoaName khi bạn đang sửa
      // console.log(this.data);
      this.maSV = this.data.sinhvien.maSV;
      this.tenSV = this.data.sinhvien.tenSV;
      this.ngaysinh = this.data.sinhvien.ngaySinh;
      this.email = this.data.sinhvien.account.email;
      this.quequan = this.data.sinhvien.queQuan;
      this.gender = this.data.sinhvien.gioiTinh;
      // console.log(this.maSV);
      this.myForm.get('lopNameControl')?.setValue(this.data.sinhvien.lop.lopId);
      //  this.tenLop = this.data.lop.tenLop;
    } else {
      this.isEditMode = false;
    }
  }
  constructor(
    // private khoaService: KhoaService,
    private sinhVienService: SinhvienService,
    private lopService: LopService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogSinhvienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  refreshForm() {
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
    // if (this.currentMarker) {
    //   this.map.removeLayer(this.currentMarker);
    // }
  }
  SinhVienComponent = this.data.SinhvienComponent;
  themSinhVien(
    tensv: string,
    gt: string,
    ngaysinh: Date,
    quequan: string,
    email: string,
    lop: number | null
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');

    // const khoaNameValue = this.myForm.get('khoaNameControl')!.value;
    const lopNameValue = this.myForm.get('lopNameControl')!.value;

    // khoa = khoaNameValue;
    lop = lopNameValue;

    console.log(tensv, gt, ngaysinh, lop, email);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.sinhVienService
      .createSinhVien(tensv, ngaysinh, gt, quequan, lop, email, authToken)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Thêm thành công');
          console.log('Thêm sinh viên thành công');
          this.SinhVienComponent.getAll();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi thêm sinh viên');
          console.error('Lỗi thêm sinh viên:', error);
        }
      );
  }
  suaSinhVien(
    masv : number,
    tensv: string,
    gt: string,
    ngaysinh: Date,
    quequan: string,
    email: string,
    lop: number | null
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    // console.log(masv);

    // const khoaNameValue = this.myForm.get('khoaNameControl')!.value;
    const lopNameValue = this.myForm.get('lopNameControl')!.value;

    // khoa = khoaNameValue;
    lop = lopNameValue;

    // console.log(masv, tensv, gt, ngaysinh, lop, email);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.sinhVienService
      .updateSinhVien(masv, tensv, ngaysinh, gt, quequan, lop, email, authToken)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Sửa thành công');
          console.log('Sửa sinh viên thành công');
          this.SinhVienComponent.getAll();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi sửa sinh viên');
          console.error('Lỗi sửa sinh viên:', error);
        }
      );
  }
  onGenderChange(event: any) {
    this.gender = event.value;
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
