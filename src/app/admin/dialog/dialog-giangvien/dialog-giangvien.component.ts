import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { ImgClientService } from 'src/app/img-client.service';
import { KhoaService } from 'src/app/khoa.service';
import { Khoa } from 'src/app/model/khoa.model';

@Component({
  selector: 'app-dialog-giangvien',
  templateUrl: './dialog-giangvien.component.html',
  styleUrls: ['./dialog-giangvien.component.css'],
})
export class DialogGiangvienComponent implements OnInit, AfterViewChecked {
  danhSachTenKhoa: Khoa[] = [];
  maGV!: number;

  khoaId = new FormControl<number | null>(null, Validators.required);
  username!: string;
  email!: string;
  password!: string;
  isLoading: boolean = false;
  isEditMode!: boolean;
  myForm!: FormGroup;

  tenGV!: string;
  isEdit!: boolean;

  currentPage = 1;
  isFocused = false;
  @ViewChild('inputElement')
  inputElement!: ElementRef;

  ngOnInit(): void {
    this.khoaService.getAllKhoa().subscribe((khoaList: Khoa[]) => {
      this.danhSachTenKhoa = khoaList;
    });
    this.myForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      khoaId: new FormControl(),
      tenGV: new FormControl(),
    });
    if (this.data.isEdit) {
      this.isEditMode = true;
      this.maGV = this.data.giangvien.maGV;
      this.tenGV = this.data.giangvien.tenGV;
      this.myForm.get('khoaId')?.setValue(this.data.giangvien.khoa.khoaId);
    } else {
      this.isEditMode = false;
    }
  }
  ngAfterViewChecked() {
    if (this.isFocused) {
      this.inputElement.nativeElement.focus();
      this.isFocused = false;
    }
  }
  constructor(
    private khoaService: KhoaService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private imgService: ImgClientService,
    private giangVienService: GiangvienService,
    // private donviService: DonviService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogGiangvienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.isEdit = data.isEdit;
  }

  onNext() {
    if (this.myForm.valid) {
      this.currentPage++;
    }
  }
  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isFocused = true;
    }
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.maGV = this.data.giangvien.maGV;
      this.tenGV = this.data.giangvien.tenGV;
      this.khoaId = this.data.giangvien.khoa.khoaId;
      this.myForm.get('khoaId')?.setValue(this.khoaId);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  GiangvienComponent = this.data.GiangvienComponent;
  themGiangVien(
    tengv: string,
    khoaId: number,
    username: string,
    password: string,
    email: string
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.dialogRef.close('Closed using function');
    this.isLoading = true;
    this.imgService
      .getDefaultImageGVAsFile()
      .subscribe((defaultImageFile: File) => {
        this.fileUploadService
          .uploadFile(defaultImageFile)
          .subscribe((data) => {
            const authToken = localStorage.getItem('authToken');
            const hinhAnh = data.filename;
            if (!authToken) {
              console.error(
                'Access token not found. User is not authenticated.'
              );
              return;
            }
            const khoaNameValue = this.myForm.get('khoaId')!.value;
            khoaId = khoaNameValue;
            console.log(tengv, khoaId, email, username, password);

            // this.donviService.getDonvi(accountid).subscribe((res) => {
            //   console.log(res.maDvtt);
            //   const donvithuctap = res.maDvtt;
            this.giangVienService
              .createGiangVien(
                tengv,
                khoaId,
                email,
                username,
                password,
                hinhAnh,
                authToken
              )
              .subscribe(
                () => {
                  this.dialog.closeAll();
                  this.isLoading = false;
                  this.toastr.success('Thêm thành công');
                  console.log('Thêm giảng viên thành công');
                  this.GiangvienComponent.getGiangVien();
                },
                (error: any) => {
                  // this.dialogRef.close('Closed using function');
                  this.isLoading = false;
                  this.toastr.error('Lỗi thêm giảng viên');
                  console.error('Lỗi thêm giảng viên:', error);
                }
              );
            // });
          });
      });
  }

  suaGiangVien(magv: number, tengv: string, khoaId: number): void {
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
    const khoaNameValue = this.myForm.get('khoaId')!.value;
    khoaId = khoaNameValue;
    this.giangVienService
      .editGiangVien(magv, tengv, khoaId, authToken)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Sửa thành công');
          console.log('Sửa giảng viên thành công');
          this.GiangvienComponent.getGiangVien();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi sửa giảng viên');
          console.error('Lỗi sửa giảng viên:', error);
        }
      );
  }

  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
