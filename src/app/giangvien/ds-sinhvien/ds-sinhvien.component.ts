import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GiangvienService } from 'src/app/giangvien.service';
import { KetquaService } from 'src/app/ketqua.service';

@Component({
  selector: 'app-ds-sinhvien',
  templateUrl: './ds-sinhvien.component.html',
  styleUrls: ['./ds-sinhvien.component.css'],
})
export class DsSinhvienComponent implements OnInit {
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
    'thaotac',
  ]; // Thay đổi các cột hiển thị theo dữ liệu của bạn

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private ketquaService: KetquaService,
    private giangvienService: GiangvienService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getSinhVienByGiangVien();
  }
  navigateToAnotherPage(element: any) {

    this.router.navigate(['/lecturer/diem-sinhvien'], { state: { element: element } });
  }
  getSinhVienByGiangVien() {
    const accountid = localStorage.getItem('accountid');

    this.giangvienService.getGiangVienByAccount(accountid).subscribe((res) => {
      this.ketquaService
        .getAllKetQuaThucTapByGiangVien(res.maGV,2)
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

}
