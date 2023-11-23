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

@Component({
  selector: 'app-dialog-lop',
  templateUrl: './dialog-lop.component.html',
  styleUrls: ['./dialog-lop.component.css'],
})
export class DialogLopComponent implements OnInit {
  danhSachTenKhoa: Khoa[] = [];
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  datas: Lop[] = [];
  khoaName = new FormControl<number | null>(null, Validators.required);
  tenLop!: string;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
      this.danhSachTenKhoa = khoaList;
    });

    this.myForm = new FormGroup({
      khoaName: new FormControl(),
      tenLop: new FormControl(),
    });

    if (this.data.isEdit) {
      this.isEditMode = true;
      // Đặt giá trị cho khoaName khi bạn đang sửa
      this.id = this.data.lop.lopId;
      this.myForm.get('khoaName')?.setValue(this.data.lop.khoa.khoaId);
      this.tenLop = this.data.lop.tenLop;
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    private khoaService: KhoaService,
    private toastr: ToastrService,
    private lopService: LopService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogLopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.lop.lopId;
      this.khoaName = this.data.lop.khoa.khoaId;
      this.myForm.get('khoaName')?.setValue(this.khoaName);
      this.tenLop = this.data.lop.tenLop;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  LopComponent = this.data.LopComponent;
  themLop(lop: string, khoaid: number | null): void {
    const khoaNameValue = this.myForm.get('khoaName')!.value;
    khoaid = khoaNameValue;
    // console.log(khoaNameValue);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');

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
    this.isLoading = true;
    this.lopService.createLop(lop, khoaid, authToken).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Thêm thành công');
        console.log('Thêm Lớp thành công');
        this.LopComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi thêm Lớp');
        console.error('Lỗi thêm Lớp:', error);
      }
    );
  }
  suaLop(id: number, lop: string, khoaid: number | null): void {
    const khoaNameValue = this.myForm.get('khoaName')!.value;
    khoaid = khoaNameValue;
    // console.log(khoaNameValue);
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');

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
    this.isLoading = true;
    this.lopService.editLop(id, lop, khoaid, authToken).subscribe(
      (data) => {
        console.log(data);
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success(data.message);
        console.log('Sửa Lớp thành công');
        this.LopComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi sửa Lớp');
        console.error('Lỗi sữa Lớp:', error);
      }
    );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
