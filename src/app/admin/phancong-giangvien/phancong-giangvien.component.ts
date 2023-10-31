import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { LopService } from 'src/app/lop.service';
import { Lop } from 'src/app/model/lop.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogPhancongGiangvienComponent } from '../dialog/dialog-phancong-giangvien/dialog-phancong-giangvien.component';

@Component({
  selector: 'app-phancong-giangvien',
  templateUrl: './phancong-giangvien.component.html',
  styleUrls: ['./phancong-giangvien.component.css'],
})
export class PhancongGiangvienComponent {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: Lop[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

  constructor(
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private translate: TranslateService,
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
    this.lopService
      .getAllLop()
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

  openDialog(code: any): void {
    this.dialog.open(OpenwarningComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        SinhvienComponent: this,
      },
      disableClose: true,
    });
  }
  openPhancongDialog(data: any): void {
    this.isEdit = false;
    this.dialog.open(DialogPhancongGiangvienComponent, {
      width: '600px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        lop: data,
        LopComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogPhancongGiangvienComponent, {
      width: '600px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        lop: data,
        LopComponent: this,
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
}
