import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { PhieudiemCanboService } from 'src/app/phieudiem-canbo.service';
import { RefreshService } from 'src/app/refresh-service.service';
import { DialogDelPdiemCanboComponent } from '../dialog/dialog-del-pdiem-canbo/dialog-del-pdiem-canbo.component';
import { DialogPhieudiemCanboComponent } from '../dialog/dialog-phieudiem-canbo/dialog-phieudiem-canbo.component';

@Component({
  selector: 'app-muc-danhgia-canbo',
  templateUrl: './muc-danhgia-canbo.component.html',
  styleUrls: ['./muc-danhgia-canbo.component.css'],
})
export class MucDanhgiaCanboComponent implements OnInit {
  isEdit: boolean = false;

  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  constructor(
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    // private mucDanhGiaCanBoService: MucDanhgiaCanboService,
     private refreshService: RefreshService,
    private translate: TranslateService,
    private phieudiemCanboService: PhieudiemCanboService,
    private toastr: ToastrService,
    // private thoigianDangkyService: ThoigianDangkyService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() muc!: any;
  private subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.refreshService.refresh$.subscribe(() => {
      this.getByMuc();
    });
    // this.getAll();
    this.getByMuc();
  }
  getByMuc() {
    this.phieudiemCanboService.getByMuc(this.muc.mucId).subscribe((res) => {
      // console.log("muc", res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  // getAll() {
  //   this.phieudiemCanboService.getAll().subscribe((res) => {
  //     // console.log(data);
  //     this.dataSource = new MatTableDataSource(res);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
  openDialog(code: any): void {
    this.dialog.open(DialogDelPdiemCanboComponent, {
      width: '450px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        PhieudiemComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogPhieudiemCanboComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        PhieudiemCanboComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogPhieudiemCanboComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        phieudiem: data,
        PhieudiemCanboComponent: this,
      },
      disableClose: true,
    });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
