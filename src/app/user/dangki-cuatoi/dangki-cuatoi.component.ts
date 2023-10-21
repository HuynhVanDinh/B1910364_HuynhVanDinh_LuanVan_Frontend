import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DangkiService } from 'src/app/dangki.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-dangki-cuatoi',
  templateUrl: './dangki-cuatoi.component.html',
  styleUrls: ['./dangki-cuatoi.component.css'],
})
export class DangkiCuatoiComponent implements OnInit {
  danhSachDangKy: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'ma',
    'tencoquan',
    'noiDung',
    'ngayDang',
    'trangThai',
  ]; // Thay đổi các cột hiển thị theo dữ liệu của bạn

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sinhvienService: SinhvienService,
    private dangKiService: DangkiService
  ) {}
  ngOnInit() {
    const accountid = localStorage.getItem('accountid');
    this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
      // this.isBaiDangForStudent(data.maSV, baiDangIds);
      this.dangKiService.getBaiDangDaDangKyCuaSinhVien(data.maSV).subscribe(
        (data) => {
          this.danhSachDangKy = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          console.log('Danh sách bài đăng đã đăng ký:', this.danhSachDangKy);
          console.log(this.dataSource);
        },
        (error) => {
          console.error('Lỗi khi lấy danh sách bài đăng đã đăng ký:', error);
        }
      );
    });
  }
  getColorForTrangThai(trangThai: number): any {
    let color;
    switch (trangThai) {
      case 0:
        color = { color: 'orange' };
        break;
      case 1:
        color = { color: 'green' };
        break;
      case 2:
        color = { color: 'red' };
        break;
      case 3:
        color = { color: 'blue' };
        break;
      default:
        color = {}; // Mặc định không có màu
    }
    return color;
  }
}
