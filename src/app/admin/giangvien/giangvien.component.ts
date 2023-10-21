import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { FileUploadService } from 'src/app/file-upload.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { ImgClientService } from 'src/app/img-client.service';
import { GiangVien } from 'src/app/model/giangvien.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogGiangvienComponent } from '../dialog/dialog-giangvien/dialog-giangvien.component';

@Component({
  selector: 'app-giangvien',
  templateUrl: './giangvien.component.html',
  styleUrls: ['./giangvien.component.css'],
})
export class GiangvienComponent implements OnInit {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  canBoList: GiangVien[] = [];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;

  constructor(
    private fileUploadService: FileUploadService,
    private giangVienService: GiangvienService,
    private imgService: ImgClientService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.getGiangVien();
  }

  getGiangVien(): void {
    this.giangVienService.getGiangVien().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
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
        GiangvienComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        GiangvienComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogGiangvienComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        giangvien: data,
        GiangvienComponent: this,
      },
      disableClose: true,
    });
    console.log(data);
  }

  searchName: string = '';
  searchSinhVien() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    // this.sinhvienService.searchSinhVien(this.searchName, authToken).subscribe(
    //   (data: any) => {
    //     // console.log(authToken);
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   (error) => {
    //     console.error('Error searching for sinh vien:', error);
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
    this.searchSinhVien();
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
