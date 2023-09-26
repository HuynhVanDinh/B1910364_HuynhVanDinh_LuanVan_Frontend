import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DonviService } from 'src/app/donvi.service';
import { KhoaService } from 'src/app/khoa.service';
import { Lop } from 'src/app/model/lop.model';
import { DialogLopComponent } from '../dialog-lop/dialog-lop.component';

@Component({
  selector: 'app-dialog-donvi',
  templateUrl: './dialog-donvi.component.html',
  styleUrls: ['./dialog-donvi.component.css'],
})
export class DialogDonviComponent implements OnInit {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  datas: Lop[] = [];
  tenDv!: string;
  tenLop!: string;
  diaChi!: string;
  soDt!: string;
  email!: string;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      tenDv: new FormControl(),
      diaChi: new FormControl(),
      soDt: new FormControl(),
      email: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log(this.data);
      this.isEditMode = true;
      this.id = this.data.donvi.maDvtt;
      this.tenDv = this.data.donvi.tenDvtt;
      this.diaChi = this.data.donvi.diaChi;
      this.soDt = this.data.donvi.soDt;
      this.email = this.data.donvi.account.email;
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    private khoaService: KhoaService,
    private toastr: ToastrService,
    private donviService: DonviService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogLopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
       this.id = this.data.donvi.maDvtt;
       this.tenDv = this.data.donvi.tenDvtt;
       this.diaChi = this.data.donvi.diaChi;
       this.soDt = this.data.donvi.soDt;
       this.email = this.data.donvi.account.email;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  onPhoneNumberInput(event: any) {
    // Lọc và chỉ cho phép các ký tự số
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Giới hạn độ dài chuỗi số điện thoại tối đa
    if (numericValue.length > 10) {
      this.soDt = numericValue.slice(0, 10);
    } else {
      this.soDt = numericValue;
    }

    // Cập nhật giá trị vào formControl
    this.myForm.get('soDt')!.setValue(this.soDt);
  }
  DonViComponent = this.data.DonViComponent;

  themDonVi(tenDv: string, diaChi: string, soDt: string, email: string): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // console.log(tenDv, diaChi, soDt);
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.donviService
      .createDonvi(tenDv, diaChi, soDt, email, authToken)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Thêm đơn vị thành công');
          console.log('Thêm đơn vị thành công');
          this.DonViComponent.getAll();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi thêm đơn vị');
          console.error('Lỗi thêm đơn vị:', error);
        }
      );
  }
  suaDonVi(id: number, tenDv: string, diaChi: string, soDt: string, email: string): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.donviService
      .editDonvi(id, tenDv, diaChi, soDt, email, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success(data.message);
          console.log('Sửa đơn vị thành công');
          this.DonViComponent.getAll();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi sửa đơn vị');
          console.error('Lỗi sữa đơn vị:', error);
        }
      );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
