import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MucDanhgiaGiangvienService } from 'src/app/muc-danhgia-giangvien.service';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogMucGiangvienComponent } from '../dialog/dialog-muc-giangvien/dialog-muc-giangvien.component';
import { DialogPhieudiemGiangvienComponent } from '../dialog/dialog-phieudiem-giangvien/dialog-phieudiem-giangvien.component';
@Component({
  selector: 'app-phieudiem-giangvien',
  templateUrl: './phieudiem-giangvien.component.html',
  styleUrls: ['./phieudiem-giangvien.component.css'],
})
export class PhieudiemGiangvienComponent implements OnInit {
  id!: number;
  ngOnInit(): void {
    console.log(this.id);
    this.myForm = new FormGroup({
      TenMuc: new FormControl(),
    });
    this.getAll();
    this.getMucByKhoa();
  }
  isLoading: boolean = false;
  mucs: any[] = [];
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  // datas: Lop[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  myForm!: FormGroup;
  TenMuc!: string;
  constructor(
    private route: ActivatedRoute,
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    // private mucDanhGiaCanBoService: MucDanhgiaCanboService,
    private translate: TranslateService,
    private mucDanhGiaGiangVienService: MucDanhgiaGiangvienService,
    // private phieudiemCanboService: PhieudiemCanboService,
    private toastr: ToastrService,
    // private thoigianDangkyService: ThoigianDangkyService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['khoaId']; // Lấy giá trị ID được truyền
      // Sử dụng giá trị ID theo nhu cầu của bạn
    });
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getMucByKhoa() {
    this.mucDanhGiaGiangVienService.getMucByKhoa(this.id).subscribe((res) => {
      console.log(res);
      this.mucs = res;
    });
  }
  refreshForm() {
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
  }
  themMuc(tenMuc: string) {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.mucDanhGiaGiangVienService.createMuc(this.id, tenMuc, authToken).subscribe(
      (data) => {
        this.isLoading = false;
        this.toastr.success('Thêm mục thành công');
        console.log('Thêm mục thành công');
        this.getMucByKhoa();
        this.refreshForm();
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Lỗi thêm mục');
        console.log('Lỗi thêm mục:', error);
      }
    );
    console.log(tenMuc);
  }
  getAll() {
    // this.phieudiemCanboService.getAll().subscribe((res) => {
    //   // console.log(data);
    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
    // this.thoigianDangkyService.getAllThoiGianDangKy().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     // Khởi tạo MatTableDataSource và thiết lập paginator
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    // });
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  openDialog(code: any, image: any): void {
    this.dialog.open(OpenwarningComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        image: image,
        SinhvienComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogPhieudiemGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        khoaId: this.id,
        PhieudiemCanboComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthemMuc(): void {
    this.isEdit = false;
    this.dialog.open(DialogMucGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        khoaId: this.id,
        isEdit: this.isEdit,
        MucGiangVienComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogsuaMuc(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogMucGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        muc: data,
        MucGiangVienComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogPhieudiemGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        khoaId: this.id,
        phieudiem: data,
        PhieudiemCanboComponent: this,
      },
      disableClose: true,
    });
  }

  searchName: string = '';

  searchLop() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    // this.lopService.searchLop(this.searchName, authToken).subscribe(
    //   (data: any) => {
    //     // console.log(authToken);
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }
  search() {
    // this.sinhvienService.searchByName(this.searchName).subscribe((res: any) => {
    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  refreshSearch() {
    this.searchName = '';
    this.searchLop();
  }

  exportData(): void {
    // const data = this.sinhvienService.getAllSinhVien().subscribe((data) => {
    //   this.excelService.exportToExcel(data, 'LoaiCoSo');
    // });
  }
  downloadFile(filename: string) {
    // this.fileUploadService.getFileOneData(filename).subscribe(
    //   (data: Blob) => {
    //     // Xử lý dữ liệu trả về, ví dụ như tạo URL tải xuống
    //     const downloadUrl = URL.createObjectURL(data);
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     link.download = filename;
    //     link.click();
    //   },
    //   (error) => {
    //     // Xử lý lỗi
    //     console.log('Lỗi !!!:', error);
    //   }
    // );
  }
  exportToPdf() {
    // this.pdfService.exportLopToPdf().subscribe((response) => {
    //   const blob = new Blob([response], { type: 'application/pdf' });
    //   const url = window.URL.createObjectURL(blob);
    //   // window.open(url); // Mở tệp PDF trong cửa sổ mới hoặc tab.
    //   this.dialog.open(PdfDialogComponent, {
    //     width: '1000px',
    //     height: '770px',
    //     enterAnimationDuration: '300ms',
    //     exitAnimationDuration: '300ms',
    //     data: { url },
    //     disableClose: true,
    //   });
    // });
  }
}
