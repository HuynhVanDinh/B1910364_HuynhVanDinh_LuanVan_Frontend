import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { th } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { MucDanhgiaCanboService } from 'src/app/muc-danhgia-canbo.service';

@Component({
  selector: 'app-dialog-muc-canbo',
  templateUrl: './dialog-muc-canbo.component.html',
  styleUrls: ['./dialog-muc-canbo.component.css'],
})
export class DialogMucCanboComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  muc!: string;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    console.log(this.data);
    this.myForm = new FormGroup({
      muc: new FormControl(),
    });

    if (!this.data.isEdit) {
      this.isEditMode = true;
      this.id = this.data.muc.mucId;
      this.muc = this.data.muc.tenMuc;
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
    private mucDanhgiaCanboService: MucDanhgiaCanboService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogMucCanboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
  MucCanBoComponent = this.data.MucCanBoComponent;
  themMuc(muc: string): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.mucDanhgiaCanboService
      .createMuc(muc, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Thêm mục thành công');
          console.log('Thêm mục thành công');
          this.MucCanBoComponent.getAllMuc();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi cập nhật');
          console.error('Lỗi sữa cập nhật:', error);
        }
      );
  }
  suaMuc(id: number, muc: string): void {
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
    this.mucDanhgiaCanboService.editMuc(id, muc, authToken).subscribe(
      (data) => {
        console.log(data);
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Cập nhật thành công');
        console.log('Cập nhật thành công');
        this.MucCanBoComponent.getAllMuc();
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
