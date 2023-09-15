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
  myForm!: FormGroup;
  datas: Khoa[] = [];
  name!: string;
  code!: string;
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
    this.myForm = new FormGroup({
      // latitude: new FormControl(),
      // longitude: new FormControl(),
      // quy_mo: new FormControl(),
      code: new FormControl(),
      name: new FormControl(),
      // address: new FormControl(),
      // loai_hinh: new FormControl(),
      // file: new FormControl(),
    });
  }
  constructor(
    private toastr: ToastrService,
    private khoaService: KhoaService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogKhoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onPhoneNumberInput(event: any) {
    // Lọc và chỉ cho phép các ký tự số
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Giới hạn độ dài chuỗi số điện thoại tối đa
    if (numericValue.length > 10) {
      this.code = numericValue.slice(0, 10);
    } else {
      this.code = numericValue;
    }

    // Cập nhật giá trị vào formControl
    this.myForm.get('code')!.setValue(this.code);
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
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
