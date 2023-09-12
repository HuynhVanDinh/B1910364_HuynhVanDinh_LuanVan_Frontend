import { Component, OnInit, ViewChild } from '@angular/core';
import { SinhvienService } from '../../sinhvien.service';
import { SinhVien } from '../../model/sinhvien.model';
import { TranslateService } from '@ngx-translate/core';
import { FileUploadService } from 'src/app/file-upload.service';
import { ExcelService } from 'src/app/excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
// import { map } from 'rxjs/operators';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogSinhvienComponent } from '../dialog/dialog-sinhvien/dialog-sinhvien.component';

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css'],
})
export class SinhvienComponent implements OnInit {
  // currentLanguageImage: string = '../../assets/logo/vn.png';
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  datas: SinhVien[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

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
      .getAllSinhVien()
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
    this.dialog.open(DialogSinhvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        SinhvienComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    // this.dialog.open(OpeneditComponent, {
    //   width: '700px',
    //   enterAnimationDuration: '300ms',
    //   exitAnimationDuration: '300ms',
    //   data: {
    //     loaicoso: data,
    //     LoaicosoComponent: this,
    //   },
    //   disableClose: true,
    // });
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
    this.searchSinhVien();
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
  // sinhVienList: any[] = [];

  // constructor(private sinhVienService: SinhvienService) {}

  // ngOnInit(): void {
  //   this.getSinhVienList();
  // }

  // getSinhVienList(): void {
  //   this.sinhVienService.getAllSinhVien().subscribe(
  //     (data) => {
  //       this.sinhVienList = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy danh sách sinh viên:', error);
  //     }
  //   );
  // }
}
