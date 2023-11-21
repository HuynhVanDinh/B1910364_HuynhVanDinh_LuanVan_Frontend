import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/excel.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { SinhvienService } from 'src/app/sinhvien.service';
import { DialoaPhancongcoquanComponent } from '../dialog/dialoa-phancongcoquan/dialoa-phancongcoquan.component';
import { DialogGuicanhbaoComponent } from '../dialog/dialog-guicanhbao/dialog-guicanhbao.component';

@Component({
  selector: 'app-sinhvien-chuadangky',
  templateUrl: './sinhvien-chuadangky.component.html',
  styleUrls: ['./sinhvien-chuadangky.component.css'],
})
export class SinhvienChuadangkyComponent {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: SinhVien[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  showCoquanValidationError: boolean = false;
  constructor(
    private fileUploadService: FileUploadService,
    private excelService: ExcelService,
    private translate: TranslateService,
    private sinhvienService: SinhvienService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.sinhvienService
      .getAllSinhVienChuaDangKy()
      // .pipe(
      //   map((res: SinhVien[]) => {
      //     // Chuyển đổi dữ liệu từ res sang một dạng khác
      //     return res.map((item) => {
      //       return {
      //         maSV: item.maSV,
      //         tenSV: item.tenSV,
      //         gioiTinh: item.gioiTinh,
      //         ngaySinh: item.ngaySinh,
      //         queQuan: item.queQuan,
      //       };
      //     });
      //   })
      // )
      .subscribe({
        next: (res) => {
          console.log(res);
          // Khởi tạo MatTableDataSource và thiết lập paginator
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        },
      });
  }

  openDialog(code: any, image: any): void {
    // this.dialog.open(OpenwarningComponent, {
    //   width: '350px',
    //   enterAnimationDuration: '300ms',
    //   exitAnimationDuration: '300ms',
    //   data: {
    //     code: code,
    //     image: image,
    //     SinhvienComponent: this,
    //   },
    //   disableClose: true,
    // });
  }
  openDialogthem(): void {
    // this.isEdit = false;
    this.dialog.open(DialogGuicanhbaoComponent, {
      width: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        SinhvienComponent: this,
      },
      disableClose: true,
    });
    // this.dialog.open(DialogSinhvienComponent, {
    //   width: '700px',
    //   enterAnimationDuration: '300ms',
    //   exitAnimationDuration: '300ms',
    //   data: {
    //     isEdit: this.isEdit,
    //     SinhvienComponent: this,
    //   },
    //   disableClose: true,
    // });
  }

  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialoaPhancongcoquanComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        sinhvien: data,
        SinhvienComponent: this,
      },

      disableClose: true,
    });
    // console.log(data);
  }

  searchName: string = '';
  searchSinhVien() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.sinhvienService.searchSinhVien(this.searchName, authToken).subscribe(
      (data: any) => {
        // console.log(authToken);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error searching for sinh vien:', error);
      }
    );
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
    this.getAll();
    // this.searchSinhVien();
  }

  exportData(): void {
    const data = this.sinhvienService.getAllSinhVien().subscribe((data) => {
      this.excelService.exportToExcel(data, 'LoaiCoSo');
    });
  }
  downloadFile(filename: string) {
    this.fileUploadService.getFileOneData(filename).subscribe(
      (data: Blob) => {
        // Xử lý dữ liệu trả về, ví dụ như tạo URL tải xuống
        const downloadUrl = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
      },
      (error) => {
        // Xử lý lỗi
        console.log('Lỗi !!!:', error);
      }
    );
  }
}
