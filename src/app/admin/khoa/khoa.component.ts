import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { KhoaService } from 'src/app/khoa.service';
import { Khoa } from 'src/app/model/khoa.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { PdfService } from 'src/app/pdf.service';
import { DialogKhoaComponent } from '../dialog/dialog-khoa/dialog-khoa.component';
import { PdfDialogComponent } from '../dialog/pdf-dialog/pdf-dialog.component';

@Component({
  selector: 'app-khoa',
  templateUrl: './khoa.component.html',
  styleUrls: ['./khoa.component.css'],
})
export class KhoaComponent {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: Khoa[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

  constructor(
    private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private translate: TranslateService,
    private khoaService: KhoaService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.khoaService
      .getAllKhoa()
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
          this.dataSource.sort = this.sort;
        },
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
    this.dialog.open(DialogKhoaComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        KhoaComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    console.log(data);
    this.isEdit = true;
    this.dialog.open(DialogKhoaComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        khoa: data,
        KhoaComponent: this,
      },
      disableClose: true,
    });
  }

  searchName: string = '';
  searchKhoa() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.khoaService.searchKhoa(this.searchName, authToken).subscribe(
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
    this.searchKhoa();
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
  // exportToPdf() {
  //   // Gọi phương thức exportKhoaToPdf từ PdfService
  //   this.pdfService.exportKhoaToPdf().subscribe((data: Blob) => {
  //     // Tạo và tải tệp PDF tương tự như trong ví dụ trước đó
  //     const blob = new Blob([data], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'khoa.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
  exportToPdf() {
    this.pdfService.exportKhoaToPdf().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      this.dialog.open(PdfDialogComponent, {
        width: '1000px',
        height: '770px',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        data: { url },
        disableClose: true,
      });
    });
  }
}
