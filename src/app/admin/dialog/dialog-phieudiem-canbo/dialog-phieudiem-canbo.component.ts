import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MucDanhgiaCanboService } from 'src/app/muc-danhgia-canbo.service';
import { PhieudiemCanboService } from 'src/app/phieudiem-canbo.service';
import { RefreshService } from 'src/app/refresh-service.service';

@Component({
  selector: 'app-dialog-phieudiem-canbo',
  templateUrl: './dialog-phieudiem-canbo.component.html',
  styleUrls: ['./dialog-phieudiem-canbo.component.css'],
})
export class DialogPhieudiemCanboComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  Noidung!: string;
  muc!: number;
  isEdit!: boolean;
  isEditMode!: boolean;
  mucs: any[] = [];
  ngOnInit(): void {
    this.getAllMuc();
    this.myForm = new FormGroup({
      Noidung: new FormControl(),
      muc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log(this.data);
      this.isEditMode = true;
      this.id = this.data.phieudiem.maPDCB;
      this.Noidung = this.data.phieudiem.noiDungPD;
      // this.muc = this.data.phieudiem.mucDG;
      this.myForm.get('muc')?.setValue(this.data.phieudiem.mucDG.mucId);
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    // private khoaService: KhoaService,
    private toastr: ToastrService,
    // private dotThucTapService: DotthuctapService,
    private phieuDiemCanBoService: PhieudiemCanboService,
    private dialog: MatDialog,
    private mucDanhGiaCanBoService: MucDanhgiaCanboService,
    private refreshService: RefreshService,
    public dialogRef: MatDialogRef<DialogPhieudiemCanboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }
  getAllMuc() {
    this.mucDanhGiaCanBoService.getAll().subscribe((res) => {
      console.log(res);
      this.mucs = res;
    });
  }
  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.phieudiem.maPDCB;
      this.Noidung = this.data.phieudiem.noiDungPD;
      // this.muc = this.data.phieudiem.mucDG.mucId;
      this.myForm.get('muc')?.setValue(this.data.phieudiem.mucDG.mucId);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  PhieudiemCanboComponent = this.data.PhieudiemCanboComponent;

  themPhieu(Noidung: string, muc: number): void {
    const mucValue = this.myForm.get('muc')!.value;
    muc = mucValue;
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
    // console.log(Noidung, muc)
    this.phieuDiemCanBoService.createPhieu(Noidung, muc, authToken).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Thêm phiếu điểm thành công');
        console.log('Thêm phiếu điểm thành công');
        this.refreshService.triggerRefresh();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi thêm phiếu điểm');
        console.error('Lỗi thêm phiếu điểm:', error);
      }
    );
  }
  suaPhieu(id: number, muc: number, Noidung: string): void {
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
    const mucValue = this.myForm.get('muc')!.value;
    muc = mucValue;
    this.isLoading = true;
    this.phieuDiemCanBoService.editPhieu(id, Noidung, muc, authToken).subscribe(
      (data) => {
        console.log(data);
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Sửa phiếu điểm thành công');
        console.log('Sửa phiếu điểm thành công');
        this.refreshService.triggerRefresh();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi sửa phiếu điểm');
        console.error('Lỗi sữa phiếu điểm:', error);
      }
    );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
