import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DotthuctapService } from 'src/app/dotthuctap.service';

@Component({
  selector: 'app-dialog-dot',
  templateUrl: './dialog-dot.component.html',
  styleUrls: ['./dialog-dot.component.css'],
})
export class DialogDotComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  tenDot!: string;
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      tenDot: new FormControl(),
      thoiGianBatDau: new FormControl(),
      thoiGianKetThuc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log(this.data);
      this.isEditMode = true;
     this.id = this.data.dot.maDot;
     this.tenDot = this.data.dot.tenDot;
     this.thoiGianBatDau = this.data.dot.thoiGianBatDau;
     this.thoiGianKetThuc = this.data.dot.thoiGianKetThuc;

    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    // private khoaService: KhoaService,
    private toastr: ToastrService,
    private dotThucTapService: DotthuctapService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogDotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.dot.maDot;
      this.tenDot = this.data.dot.tenDot;
      this.thoiGianBatDau = this.data.dot.thoiGianBatDau;
      this.thoiGianKetThuc = this.data.dot.thoiGianKetThuc;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  DotComponent = this.data.DotComponent;

  themDot(tenDot: string, thoiGianBatDau: Date, thoiGianKetThuc: Date): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.dotThucTapService
      .createDotthuctap(tenDot, thoiGianBatDau, thoiGianKetThuc, authToken)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Thêm đợt thực tập thành công');
          console.log('Thêm đợt thực tập thành công');
          this.DotComponent.getAll();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi thêm đợt thực tập');
          console.error('Lỗi thêm đợt thực tập:', error);
        }
      );
  }
  suaDot(
    id: number,
    tenDot: string,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date
  ): void {
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
    this.dotThucTapService
      .editDotthuctap(id, tenDot, thoiGianBatDau, thoiGianKetThuc, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success(data.message);
          console.log('Sửa đơn vị thành công');
          this.DotComponent.getAll();
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
