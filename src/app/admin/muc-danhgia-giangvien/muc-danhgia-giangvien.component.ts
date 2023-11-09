import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MucDanhgiaGiangvienService } from 'src/app/muc-danhgia-giangvien.service';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { PhieudiemCanboService } from 'src/app/phieudiem-canbo.service';
import { PhieudiemGiangvienService } from 'src/app/phieudiem-giangvien.service';
import { RefreshService } from 'src/app/refresh-service.service';
import { DialogPhieudiemGiangvienComponent } from '../dialog/dialog-phieudiem-giangvien/dialog-phieudiem-giangvien.component';

@Component({
  selector: 'app-muc-danhgia-giangvien',
  templateUrl: './muc-danhgia-giangvien.component.html',
  styleUrls: ['./muc-danhgia-giangvien.component.css'],
})
export class MucDanhgiaGiangvienComponent {
  isEdit: boolean = false;

  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  constructor(
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private mucDanhGiaGiangvienService: MucDanhgiaGiangvienService,
    private refreshService: RefreshService,
    private translate: TranslateService,
    private phieudiemGiangvienService: PhieudiemGiangvienService,
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
    console.log("hihi",this.muc)
  }
  getByMuc() {
    this.phieudiemGiangvienService.getByMuc(this.muc.mucId).subscribe((res) => {
      console.log("muc", res);
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
    // this.dialog.open(DialogPhieudiemCanboComponent, {
    //   width: '700px',
    //   enterAnimationDuration: '300ms',
    //   exitAnimationDuration: '300ms',
    //   data: {
    //     isEdit: this.isEdit,
    //     PhieudiemCanboComponent: this,
    //   },
    //   disableClose: true,
    // });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogPhieudiemGiangvienComponent, {
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
