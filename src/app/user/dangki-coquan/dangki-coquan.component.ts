import {
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaidangService } from 'src/app/baidang.service';
import { DangkiService } from 'src/app/dangki.service';
import { DangkyThuctapService } from 'src/app/dangky-thuctap.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-dangki-coquan',
  templateUrl: './dangki-coquan.component.html',
  styleUrls: ['./dangki-coquan.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class DangkiCoquanComponent implements OnInit, PipeTransform {
  isLoading: boolean = false;
  isSinhVienDaNhanHoSo!: any[];
  isGhiDanh: boolean = false;
  isGhiDanhMap: { [key: number]: boolean } = {};
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dangkiService: DangkiService,
    private sinhvienService: SinhvienService,
    private baidangService: BaidangService,
    private dangkyThuctapService: DangkyThuctapService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.getAll();
      this.isLoading = false;
    }, 300);

    this.getSinhVienDaNhanHoSo();
    // this.isBaiDang();
  }
  transform(value: number): string {
    // Sử dụng Intl.NumberFormat để định dạng số tiền và thêm đơn vị VNĐ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
  getSinhVienDaNhanHoSo() {
    const accountid = localStorage.getItem('accountid');
    this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
      this.dangkyThuctapService
        .getAllKetQuaThucTapSinhVien(data.maSV)
        .subscribe((data) => {
          // this.isSinhVienDaNhanHoSo =data as unknown as boolean;
          this.isSinhVienDaNhanHoSo = data;
          console.log('kkk', data);
        });
    });
  }
  getAll() {
    this.baidangService.getAllBaiDang().subscribe({
      next: (res) => {
        const baiDangIds = res.map((baidang: any) => baidang.maBD);
        const accountid = localStorage.getItem('accountid');
        this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
          this.isBaiDangForStudent(data.maSV, baiDangIds);
        });
        // console.log(res);
        // Khởi tạo MatTableDataSource và thiết lập paginator
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
    });
  }
  isBaiDangForStudent(sinhVienId: number, baiDangIds: number[]) {
    // Kiểm tra từng bài đăng cho sinh viên
    baiDangIds.forEach((baiDangId) => {
      this.dangkiService.isBaiDang(sinhVienId, baiDangId).subscribe(
        (result) => {
          if (result.registered) {
            console.log(
              `Sinh viên ${sinhVienId} đã đăng ký bài đăng ${baiDangId}`
            );
            this.isGhiDanhMap[baiDangId] = true;

            console.log(this.isGhiDanh);
            // Xử lý tương ứng khi sinh viên đã đăng ký
          } else {
            console.log(
              `Sinh viên ${sinhVienId} chưa đăng ký bài đăng ${baiDangId}`
            );
            this.isGhiDanhMap[baiDangId] = false;
            console.log(this.isGhiDanh);
            // Xử lý tương ứng khi sinh viên chưa đăng ký
          }
        },
        (error) => {
          console.error(
            `Lỗi khi kiểm tra bài đăng cho sinh viên ${sinhVienId}:`,
            error
          );
          // Xử lý lỗi khi gọi API kiểm tra
        }
      );
    });
  }

  onPageChange(event: any) {
    // Xử lý sự kiện khi người dùng thay đổi trang
    this.pageSize = event.pageSize;
  }
}
