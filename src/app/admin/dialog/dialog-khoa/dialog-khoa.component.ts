import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KhoaService } from 'src/app/khoa.service';
import { Khoa } from 'src/app/model/khoa.model';

@Component({
  selector: 'app-dialog-khoa',
  templateUrl: './dialog-khoa.component.html',
  styleUrls: ['./dialog-khoa.component.css'],
})
export class DialogKhoaComponent implements OnInit {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  datas: Khoa[] = [];
  khoaName!: string;
  khoaSdt!: string;
  isEdit!: boolean;
  isEditMode!: boolean;
  // quy_mo!: string;
  // loai_hinh!: string;
  // latitude!: number;
  // longitude!: number;
  // geojson!: string;
  // address!: string;
  // image!: string;
  // files!: any[];
  // selectedFile: File | undefined;
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.isEditMode = true;
      // console.log(this.data);
      this.id = this.data.khoa.khoaId;
      this.khoaName = this.data.khoa.khoaName;
      this.khoaSdt = this.data.khoa.khoaSdt;
      this.myForm = new FormGroup({
        khoaName: new FormControl(),
        khoaSdt: new FormControl(),
      });
    } else {
      this.isEditMode = false;
      this.myForm = new FormGroup({
        khoaName: new FormControl(),
        khoaSdt: new FormControl(),
      });
    }
  }
  constructor(
    private toastr: ToastrService,
    private khoaService: KhoaService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogKhoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }
  onPhoneNumberInput(event: any) {
    // Lọc và chỉ cho phép các ký tự số
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Giới hạn độ dài chuỗi số điện thoại tối đa
    if (numericValue.length > 11) {
      this.khoaSdt = numericValue.slice(0, 11);
    } else {
      this.khoaSdt = numericValue;
    }

    // Cập nhật giá trị vào formControl
    this.myForm.get('khoaSdt')!.setValue(this.khoaSdt);
  }
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.khoa.khoaId;
      this.khoaName = this.data.khoa.khoaName;
      this.khoaSdt = this.data.khoa.khoaSdt;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  KhoaComponent = this.data.KhoaComponent;
  themKhoa(name: string, code: string): void {
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
    this.khoaService.themkhoa(name, code, authToken).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Thêm thành công');
        console.log('Thêm khoa thành công');
        this.KhoaComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi thêm khoa');
        console.error('Lỗi thêm khoa:', error);
      }
    );
    //       this.selectedFile = undefined;
    //     }
    //     // (error) => {
    //     //   console.log('Error:', error);
    //     // }
    //   );
    // }
  }
  suaKhoa(id: number, name: string, code: string): void {
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
    this.khoaService.suakhoa(id, name, code, authToken).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Sửa thành công');
        console.log('Sửa khoa thành công');
        this.KhoaComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi sửa khoa');
        console.error('Lỗi sửa khoa:', error);
      }
    );
    //       this.selectedFile = undefined;
    //     }
    //     // (error) => {
    //     //   console.log('Error:', error);
    //     // }
    //   );
    // }
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
