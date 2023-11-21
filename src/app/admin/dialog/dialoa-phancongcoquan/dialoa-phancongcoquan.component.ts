import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DangkyThuctapService } from 'src/app/dangky-thuctap.service';
import { DonviService } from 'src/app/donvi.service';
import { DotthuctapService } from 'src/app/dotthuctap.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { KetquaService } from 'src/app/ketqua.service';
import { KhoaService } from 'src/app/khoa.service';
import { GiangVien } from 'src/app/model/giangvien.model';
import { Khoa } from 'src/app/model/khoa.model';
import { Lop } from 'src/app/model/lop.model';

@Component({
  selector: 'app-dialoa-phancongcoquan',
  templateUrl: './dialoa-phancongcoquan.component.html',
  styleUrls: ['./dialoa-phancongcoquan.component.css'],
})
export class DialoaPhancongcoquanComponent {
  danhSachTenKhoa: any[] = [];
  // danhSachTenKhoa: any[] = [];
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  datas: Lop[] = [];
  khoaName!: number;
  giangVien!: number;
  khoa = new FormControl<number | null>(null, Validators.required);
  tenLop!: string;
  isEdit!: boolean;
  isEditMode!: boolean;
  listDot!: any[];
  dot = new FormControl<number | null>(null, Validators.required);
  ngOnInit(): void {
    // this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
    //   this.danhSachTenKhoa = khoaList;
    // });
    this.donviService.getAllDonViByKhoa().subscribe((res: GiangVien[]) => {
      this.danhSachTenKhoa = res;
      console.log('res nè', res);
    });
    this.getDot();
    console.log(this.data);
    this.myForm = new FormGroup({
      khoaName: new FormControl(),
      dot: new FormControl(),
      tenLop: new FormControl(),
      khoa: new FormControl(),
    });

    if (!this.data.isEdit) {
      this.isEditMode = true;
      this.id = this.data.sinhvien;

      this.myForm.get('khoa')?.setValue(this.data.lop.giangVien.maGV);
      // this.tenLop = this.data.lop.tenLop;
    } else {
      this.id = this.data.sinhvien.maSV;
      this.giangVien = this.data.sinhvien.lop.giangVien.maGV;
      // console.log(this.data)
      this.isEditMode = false;
    }
  }

  constructor(
    private khoaService: KhoaService,
    private giangVienService: GiangvienService,
    private toastr: ToastrService,
    // private lopService: LopService,
    private dangkyThuctapService: DangkyThuctapService,
    private dotThucTapService: DotthuctapService,
    private donviService: DonviService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialoaPhancongcoquanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }
  getDot() {
    this.dotThucTapService.getAllDotthuctap().subscribe((data) => {
      this.listDot = data;
    });
  }

  refreshForm() {
    if (!this.data.isEdit) {
      this.id = this.data.lop.lopId;
      this.myForm.get('khoa')?.setValue(this.data.lop.giangVien.maGV);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
      this.myForm.get('khoa')?.setValue('');
    }
  }
  SinhvienComponent = this.data.SinhvienComponent;
  themLop(id: number, khoa: number | null, dot: number | null): void {
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
    const khoaValue = this.myForm.get('khoa')!.value;
    khoa = khoaValue;
    const dotValue = this.myForm.get('dot')!.value;
    dot = dotValue;
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (this.giangVien == null) {
      console.log('không tồn tại');
      this.toastr.warning('Chưa phân công giảng viên');
      return;
    }
    console.log(id, khoa, this.giangVien, dot);
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.dangkyThuctapService
      .createKetQuaThucTapKhoa(id, khoa, this.giangVien, dot)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success('Phân công thành công');
          this.SinhvienComponent.getAll();
          console.log(response);
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Lỗi');
          this.SinhvienComponent.getAll();
          console.error(error);
        }
      );
    // this.lopService.phanCongGiangVien(id, giangvien, authToken).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.dialog.closeAll();
    //     this.isLoading = false;
    //     this.toastr.success(data.message);
    //     console.log('Cập nhật thành công');
    //     this.LopComponent.getAll();
    //   },
    //   (error: any) => {
    //     this.dialogRef.close('Closed using function');
    //     this.isLoading = false;
    //     this.toastr.error('Lỗi cập nhật');
    //     console.error('Lỗi sữa cập nhật:', error);
    //   }
    // );
  }
  suaLop(id: number, giangvien: number): void {
    const giangVienValue = this.myForm.get('giangVien')!.value;
    giangvien = giangVienValue;
    console.log(giangvien);
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

    // this.lopService.phanCongGiangVien(id, giangvien, authToken).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.dialog.closeAll();
    //     this.isLoading = false;
    //     this.toastr.success(data.message);
    //     console.log('Cập nhật thành công');
    //     this.LopComponent.getAll();
    //   },
    //   (error: any) => {
    //     this.dialogRef.close('Closed using function');
    //     this.isLoading = false;
    //     this.toastr.error('Lỗi cập nhật');
    //     console.error('Lỗi sữa cập nhật:', error);
    //   }
    // );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
