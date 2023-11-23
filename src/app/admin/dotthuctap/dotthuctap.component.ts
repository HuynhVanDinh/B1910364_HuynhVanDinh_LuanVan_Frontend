import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DotthuctapService } from 'src/app/dotthuctap.service';
import { Dot } from 'src/app/model/dot.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogDotComponent } from '../dialog/dialog-dot/dialog-dot.component';

@Component({
  selector: 'app-dotthuctap',
  templateUrl: './dotthuctap.component.html',
  styleUrls: ['./dotthuctap.component.css'],
})
export class DotthuctapComponent {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: Dot[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  searchName: string | null = null;
  searchThoiGianBatDau: Date | null = null;
  searchThoiGianKetThuc: Date | null = null;
  constructor(
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private translate: TranslateService,
    private dotThucTapService: DotthuctapService,
    // private lopService: LopService,
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
    this.dotThucTapService.getAllDotthuctap().subscribe({
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

  openDialog(code: any): void {
    this.dialog.open(OpenwarningComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        DotComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogDotComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        DotComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogDotComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        dot: data,
        DotComponent: this,
      },
      disableClose: true,
    });
  }

  searchDot() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.dotThucTapService
      .searchDotThucTap(
        this.searchName,
        this.searchThoiGianBatDau,
        this.searchThoiGianKetThuc,
        authToken
      )
      .subscribe(
        (data: any) => {
          // console.log(authToken);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
        },
        (error) => {
          console.error('Error:', error);
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
    this.searchThoiGianBatDau = null;
    this.searchThoiGianKetThuc = null;
    this.searchDot();
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
    // this.pdfService.exportDonViToPdf().subscribe((response) => {
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
