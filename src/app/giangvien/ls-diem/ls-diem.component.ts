import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GiangvienService } from 'src/app/giangvien.service';
import { KetquaService } from 'src/app/ketqua.service';
import { DialogLsDiemComponent } from '../dialog/dialog-ls-diem/dialog-ls-diem.component';

@Component({
  selector: 'app-ls-diem',
  templateUrl: './ls-diem.component.html',
  styleUrls: ['./ls-diem.component.css'],
})
export class LsDiemComponent {
  listSinhVien!: any[];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'ma',
    'tensinhvien',
    'gioitinh',
    'ngaysinh',
    'quequan',
    'coquan',
    'canbo',
    'diemso',
    'thaotac',
  ]; // Thay đổi các cột hiển thị theo dữ liệu của bạn

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private ketquaService: KetquaService,
    private giangvienService: GiangvienService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getSinhVienByGiangVien();
  }
  navigateToAnotherPage(element: any) {
    this.router.navigate(['/lecturer/diem-sinhvien'], {
      state: { element: element },
    });
  }
  getSinhVienByGiangVien() {
    const accountid = localStorage.getItem('accountid');

    this.giangvienService.getGiangVienByAccount(accountid).subscribe((res) => {
      this.ketquaService
        .getAllKetQuaThucTapByGiangVien(res.maGV, 3)
        .subscribe((data) => {
          console.log(data);
          this.listSinhVien = data;
          this.dataSource.data = data;
          console.log(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
        });
    });
  }
  // getColorForTrangThai(trangThai: number): any {
  //   let color;
  //   switch (trangThai) {
  //     case 0:
  //       color = { color: 'orange' };
  //       break;
  //     case 1:
  //       color = { color: 'green' };
  //       break;
  //     case 2:
  //       color = { color: 'red' };
  //       break;
  //     case 3:
  //       color = { color: 'blue' };
  //       break;
  //     default:
  //       color = {}; // Mặc định không có màu
  //   }
  //   return color;
  // }
  opendialogLsDiem(data: any): void {
    this.dialog.open(DialogLsDiemComponent, {
      width: '900px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        sinhvien: data,
        LsDiemComponent: this,
      },
      disableClose: true,
    });
  }
}
