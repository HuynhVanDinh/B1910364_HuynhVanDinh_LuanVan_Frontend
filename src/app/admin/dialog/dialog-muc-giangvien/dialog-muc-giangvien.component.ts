import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MucDanhgiaGiangvienService } from 'src/app/muc-danhgia-giangvien.service';

@Component({
  selector: 'app-dialog-muc-giangvien',
  templateUrl: './dialog-muc-giangvien.component.html',
  styleUrls: ['./dialog-muc-giangvien.component.css'],
})
export class DialogMucGiangvienComponent {
  isLoading: boolean = false;
  id!: number;
  khoaId!: number;
  myForm!: FormGroup;
  muc!: string;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    console.log(this.data);
    // console.log("khoa",this.khoaId);
    this.myForm = new FormGroup({
      muc: new FormControl(),
    });

    if (!this.data.isEdit) {
      this.isEditMode = true;

      // this.id = this.data.muc.mucId;
      // this.muc = this.data.muc.tenMuc;
    } else {
      this.id = this.data.muc.mucId;
      this.muc = this.data.muc.tenMuc;
      this.isEditMode = false;
    }
  }

  constructor(
    // private khoaService: KhoaService,
    // private giangVienService: GiangvienService,
    private toastr: ToastrService,
    // private lopService: LopService,
    private mucDanhgiaGiangvienService: MucDanhgiaGiangvienService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogMucGiangvienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.khoaId = this.data.khoaId;
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.muc.mucId;
      this.muc = this.data.muc.tenMuc;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  MucGiangVienComponent = this.data.MucGiangVienComponent;
  themMuc(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.mucDanhgiaGiangvienService
      .createMuc(this.khoaId, this.muc, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Thêm mục thành công');
          console.log('Thêm mục thành công');
          this.MucGiangVienComponent.getMucByKhoa();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi thêm mục');
          console.error('Lỗi thêm mục:', error);
        }
      );
  }
  suaMuc(id: number): void {
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
    this.mucDanhgiaGiangvienService
      .editMuc(id, this.muc, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Cập nhật thành công');
          console.log('Cập nhật thành công');
          this.MucGiangVienComponent.getMucByKhoa();
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
