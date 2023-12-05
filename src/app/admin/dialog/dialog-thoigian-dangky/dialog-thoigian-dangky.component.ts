import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KhoaService } from 'src/app/khoa.service';
import { Khoa } from 'src/app/model/khoa.model';
import { ThoigianDangkyService } from 'src/app/thoigian-dangky.service';

@Component({
  selector: 'app-dialog-thoigian-dangky',
  templateUrl: './dialog-thoigian-dangky.component.html',
  styleUrls: ['./dialog-thoigian-dangky.component.css'],
})
export class DialogThoigianDangkyComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  ghiChu!: string;
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;
  khoaName = new FormControl<number | null>(null, Validators.required);
  danhSachTenKhoa: Khoa[] = [];
  ngOnInit(): void {
    console.log(this.data);
    this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
      this.danhSachTenKhoa = khoaList;
    });
    this.myForm = new FormGroup({
      ghiChu: new FormControl(),
      khoaName: new FormControl(),
      thoiGianBatDau: new FormControl(),
      thoiGianKetThuc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log(this.data);
      this.isEditMode = true;
      this.id = this.data.thoigian.id_tgdk;
      this.ghiChu = this.data.thoigian.ghichu;
      this.thoiGianBatDau = this.data.thoigian.tgbd;
      this.thoiGianKetThuc = this.data.thoigian.tgkt;
      this.myForm.get('khoaName')?.setValue(this.data.thoigian.khoa.khoaId);
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    @Inject(MAT_DATE_LOCALE) private dateLocale: string,
    private khoaService: KhoaService,
    private toastr: ToastrService,
    // private dotThucTapService: DotthuctapService,
    private thoiGianDangKyService: ThoigianDangkyService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogThoigianDangkyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.thoigian.id_tgdk;
      this.ghiChu = this.data.thoigian.ghichu;
      this.thoiGianBatDau = this.data.thoigian.tgbd;
      this.thoiGianKetThuc = this.data.thoigian.tgkt;
      this.myForm.get('khoaName')?.setValue(this.data.thoigian.khoa.khoaId);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
      this.myForm.get('khoaName')?.setValue('');
    }
  }

  ThoigianDangkyComponent = this.data.ThoigianDangkyComponent;

  themThoigian(
    ghiChu: string,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date,
    khoaId: number
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const khoaNameValue = this.myForm.get('khoaName')!.value;
    khoaId = khoaNameValue;
    // console.log("fkfhgj");
    // this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    // console.log(khoaId)
    this.isLoading = true;
    this.thoiGianDangKyService
      .createThoiGianDangKy(
        thoiGianBatDau,
        thoiGianKetThuc,
        ghiChu,
        khoaId,
        authToken
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          console.log('djhgjkfhasjbjskhjk');
          this.isLoading = false;
          this.toastr.success('Thêm thời gian đang ký thành công');
          console.log('Thêm thời gian đang ký thành công');
          this.ThoigianDangkyComponent.getAll();
        },
        (error: any) => {
          // this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error(error);
          console.error('Lỗi thêm thời gian đang ký:', error);
        }
      );
  }

  suaThoigian(
    id: number,
    ghiChu: string,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date,
    khoaId: number
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.thoiGianDangKyService
      .editThoiGianDangKy(
        id,
        thoiGianBatDau,
        thoiGianKetThuc,
        ghiChu,
        khoaId,
        authToken
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Sửa thời gian đang ký thành công');
          console.log('Sửa thời gian đang ký thành công');
          this.ThoigianDangkyComponent.getAll();
        },
        (error: any) => {
          // this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error(error);
          console.error('Lỗi sữa thời gian đang ký:', error);
        }
      );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
