import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DonviService } from 'src/app/donvi.service';
import { LopService } from 'src/app/lop.service';
import { DonVi } from 'src/app/model/donvi.model';
import { Lop } from 'src/app/model/lop.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { PdfService } from 'src/app/pdf.service';
import { DialogDonviComponent } from '../dialog/dialog-donvi/dialog-donvi.component';
import { DialogLopComponent } from '../dialog/dialog-lop/dialog-lop.component';
import { PdfDialogComponent } from '../dialog/pdf-dialog/pdf-dialog.component';

@Component({
  selector: 'app-donvi',
  templateUrl: './donvi.component.html',
  styleUrls: ['./donvi.component.css'],
})
export class DonviComponent implements OnInit {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: DonVi[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

  constructor(
    private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private translate: TranslateService,
    private donviService: DonviService,
    private lopService: LopService,
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
    this.donviService
      .getAllDonVi()
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
    this.dialog.open(DialogDonviComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        DonViComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogDonviComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        donvi: data,
        DonViComponent: this,
      },
      disableClose: true,
    });
  }

  searchName: string = '';

  searchDonVi() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.donviService.searchDonVi(this.searchName, authToken).subscribe(
      (data: any) => {
        // console.log(authToken);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        
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
    this.searchDonVi();
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
    this.pdfService.exportDonViToPdf().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url); // Mở tệp PDF trong cửa sổ mới hoặc tab.
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
