import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MucDanhgiaGiangvienService } from 'src/app/muc-danhgia-giangvien.service';
import { PhieudiemGiangvienService } from 'src/app/phieudiem-giangvien.service';
import { RefreshService } from 'src/app/refresh-service.service';

@Component({
  selector: 'app-dialog-phieudiem-giangvien',
  templateUrl: './dialog-phieudiem-giangvien.component.html',
  styleUrls: ['./dialog-phieudiem-giangvien.component.css'],
})
export class DialogPhieudiemGiangvienComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  Noidung!: string;
  diemMax!: Float32Array;
  muc = new FormControl<number | null>(null, Validators.required);
  isEdit!: boolean;
  isEditMode!: boolean;
  mucs: any[] = [];
  ngOnInit(): void {
    this.getAllMuc();
    this.myForm = new FormGroup({
      Noidung: new FormControl(),
      diemMax: new FormControl(),
      muc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log(this.data);
      this.isEditMode = true;
      this.id = this.data.phieudiem.maPDGV;
      this.Noidung = this.data.phieudiem.noiDungPDGV;
      this.diemMax = this.data.phieudiem.diemMax;
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
    private phieuDiemGiangvienService: PhieudiemGiangvienService,
    private dialog: MatDialog,
    private mucDanhGiaCanBoService: MucDanhgiaGiangvienService,
    private refreshService: RefreshService,
    public dialogRef: MatDialogRef<DialogPhieudiemGiangvienComponent>,
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
      this.diemMax = this.data.phieudiem.diemMax;
      // this.muc = this.data.phieudiem.mucDG.mucId;
      this.myForm.get('muc')?.setValue(this.data.phieudiem.mucDG.mucId);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  PhieudiemCanboComponent = this.data.PhieudiemCanboComponent;

  themPhieu(Noidung: string, diemMax: Float32Array, muc: number): void {
    const mucValue = this.myForm.get('muc')!.value;
    muc = mucValue;
    const khoaId = this.data.khoaId;
    console.log(khoaId);
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
    this.phieuDiemGiangvienService
      .createPhieu(Noidung, diemMax, muc, khoaId, authToken)
      .subscribe(
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
  suaPhieu(
    id: number,
    muc: number,
    diemMax: Float32Array,
    Noidung: string
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
    const mucValue = this.myForm.get('muc')!.value;
    muc = mucValue;
    this.isLoading = true;
    this.phieuDiemGiangvienService
      .editPhieu(id, Noidung, diemMax, muc, authToken)
      .subscribe(
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
