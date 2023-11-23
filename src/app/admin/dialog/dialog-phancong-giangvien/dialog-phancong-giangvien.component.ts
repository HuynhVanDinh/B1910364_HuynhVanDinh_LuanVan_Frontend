import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GiangvienService } from 'src/app/giangvien.service';
import { KhoaService } from 'src/app/khoa.service';
import { LopService } from 'src/app/lop.service';
import { GiangVien } from 'src/app/model/giangvien.model';
import { Khoa } from 'src/app/model/khoa.model';
import { Lop } from 'src/app/model/lop.model';

@Component({
  selector: 'app-dialog-phancong-giangvien',
  templateUrl: './dialog-phancong-giangvien.component.html',
  styleUrls: ['./dialog-phancong-giangvien.component.css'],
})
export class DialogPhancongGiangvienComponent {
  danhSachTenKhoa: Khoa[] = [];
  danhSachTenGiangVien: GiangVien[] = [];
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  datas: Lop[] = [];
  khoaName!: number;
  giangVien = new FormControl<number | null>(null, Validators.required);
  tenLop!: string;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
      this.danhSachTenKhoa = khoaList;
    });
    this.giangVienService
      .getGiangVienByKhoa(this.data.lop.khoa.khoaId)
      .subscribe((res: GiangVien[]) => {
        this.danhSachTenGiangVien = res;
        // console.log("res nè",res)
      });
    console.log(this.data);
    this.myForm = new FormGroup({
      khoaName: new FormControl(),
      tenLop: new FormControl(),
      giangVien: new FormControl(),
    });

    if (!this.data.isEdit) {
      this.isEditMode = true;
      this.id = this.data.lop.lopId;
      this.myForm.get('giangVien')?.setValue(this.data.lop.giangVien.maGV);
      // this.tenLop = this.data.lop.tenLop;
    } else {
      this.id = this.data.lop.lopId;
      this.isEditMode = false;
    }
  }

  constructor(
    private khoaService: KhoaService,
    private giangVienService: GiangvienService,
    private toastr: ToastrService,
    private lopService: LopService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogPhancongGiangvienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (!this.data.isEdit) {
      this.id = this.data.lop.lopId;
      this.myForm.get('giangVien')?.setValue(this.data.lop.giangVien.maGV);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
      this.myForm.get('giangVien')?.setValue('');
    }
  }
  LopComponent = this.data.LopComponent;
  themLop(id: number, giangvien: number): void {
    const giangVienValue = this.myForm.get('giangVien')!.value;
    giangvien = giangVienValue;
    // console.log(khoaNameValue);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // this.dialogRef.close('Closed using function');
    // if (this.selectedFile) {
    //   this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //     (data) => {
    //       image = data.filename;
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }

    this.lopService.phanCongGiangVien(id, giangvien, authToken).subscribe(
      (data) => {
        console.log(data);
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success(data.message);
        console.log('Cập nhật thành công');
        this.LopComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi cập nhật');
        console.error('Lỗi sữa cập nhật:', error);
      }
    );
  }
  suaLop(id: number, giangvien: number): void {
    // console.log(giangvien);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const giangVienValue = this.myForm.get('giangVien')!.value;
    giangvien = giangVienValue;
    // this.dialogRef.close('Closed using function');
    // if (this.selectedFile) {
    //   this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //     (data) => {
    //       image = data.filename;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }

    this.lopService.phanCongGiangVien(id, giangvien, authToken).subscribe(
      (data) => {
        console.log(data);
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success(data.message);
        console.log('Cập nhật thành công');
        this.LopComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi cập nhật');
        console.error('Lỗi sữa cập nhật:', error);
      }
    );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
