import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { th } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { DangkiService } from 'src/app/dangki.service';
import { DangkyThuctapService } from 'src/app/dangky-thuctap.service';
import { DotthuctapService } from 'src/app/dotthuctap.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { DonVi } from 'src/app/model/donvi.model';
import { Dot } from 'src/app/model/dot.model';
import { GiangVien } from 'src/app/model/giangvien.model';
import { KetQua } from 'src/app/model/ketqua.model';
import { SinhvienService } from 'src/app/sinhvien.service';
import { ThoigianDangkyService } from 'src/app/thoigian-dangky.service';
import { HuongdanComponent } from '../huongdan/huongdan.component';

@Component({
  selector: 'app-dangki-thuctap',
  templateUrl: './dangki-thuctap.component.html',
  styleUrls: ['./dangki-thuctap.component.css'],
})
export class DangkiThuctapComponent implements OnInit {
  cities: any[];
  coquans: any[];
  dots: any[];
  selectedCity: any;
  selectedCoquan: any;
  selectedDot: any;
  initialCoquan: any;
  initialCity: any;
  initialDot: any;
  thoi_gian_dang_ky!: any[];
  defaults: any[] = [
    {
      id_tgdk: 1,
      tgbd: '2023-08-01',
      tgkt: '2023-12-31',
      ghichu: 'Some notes here',
    },
  ];
  isLoading: boolean = false;
  listGiangVien: GiangVien[] = [];
  listCoQuan: DonVi[] = [];
  listDot: Dot[] = [];
  listKetQua: any;
  value!: string;
  showCityValidationError: boolean = false;
  showCoquanValidationError: boolean = false;
  showDotValidationError: boolean = false;
  ngOnInit(): void {
    this.getAll();
  }
  constructor(
    public dialog: MatDialog,
    private giangVienService: GiangvienService,
    private dangKiService: DangkiService,
    private sinhvienService: SinhvienService,
    private thoigianDangkyService: ThoigianDangkyService,
    private dotThucTapService: DotthuctapService,
    private dangkyThuctapService: DangkyThuctapService,
    private toastr: ToastrService
  ) {
    this.cities = this.listGiangVien;
    this.coquans = this.listCoQuan;
    this.dots = this.listDot;
  }
  getAll() {
    this.getDangKy();
    this.getGiangVien();
    this.getCoQuan();
    this.getDot();
    this.getThoiGianDangKy();
  }
  getDangKy() {
    const accountid = localStorage.getItem('accountid');
    this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
      this.dangkyThuctapService
        .getAllKetQuaThucTapSinhVien(data.maSV)
        .subscribe((data) => {
          this.listKetQua = data;
          console.log('ket qua:', this.listKetQua);
        });
    });
  }
  getThoiGianDangKy() {
    const accountid = localStorage.getItem('accountid');
    this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
      // console.log(data.lop.khoa.khoaId);
      this.thoigianDangkyService
        .getAllThoiGianDangKyKhoa(data.lop.khoa.khoaId)
        .subscribe((data) => {
          // console.log('ajfgkj', data);
          this.thoi_gian_dang_ky = data;
        });
    });
  }
  getGiangVien() {
    this.giangVienService.getGiangVien().subscribe((data) => {
      this.listGiangVien = data;
      this.cities = this.listGiangVien;
      console.log(this.listGiangVien);
    });
  }
  getDot() {
    this.dotThucTapService.getAllDotthuctap().subscribe((data) => {
      this.listDot = data;
      this.dots = this.listDot;
    });
  }
  getCoQuan() {
    const accountid = localStorage.getItem('accountid');
    this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
      this.dangKiService.getDangKyDaDuyet(data.maSV).subscribe((res) => {
        this.listCoQuan = res;
        this.coquans = this.listCoQuan;
        console.log(this.listCoQuan);
      });
    });
  }
  filterCities(event: any) {
    if (!event.value && this.selectedCity !== this.initialCity) {
      this.selectedCity = this.initialCity;
    } else {
      const selectedCity = event.value.tenGV; // Lấy giá trị được chọn trong dropdown
      console.log(selectedCity);
      this.showCityValidationError = false;

      // Thực hiện lọc danh sách tùy chọn dựa trên selectedCity
      // if (selectedCity) {
      //   // Nếu đã chọn một giá trị, lọc danh sách tùy chọn
      //   this.cities = this.cities.filter((city) => city.tenGV === selectedCity);
      // } else {
      //   // Nếu không có giá trị nào được chọn, hiển thị lại toàn bộ danh sách
      //   this.cities = this.listGiangVien;
      // }
      this.selectedCity = event.value.maGV;
    }
  }
  filterCoQuans(event: any) {
    if (!event.value && this.selectedCoquan !== this.initialCoquan) {
      this.selectedCoquan = this.initialCoquan;
    } else {
      const selectedCoquan = event.value.baiDang.donViThucTap.tenDvtt; // Lấy giá trị được chọn trong dropdown
      console.log(selectedCoquan);
      this.showCoquanValidationError = false;
      // Thực hiện lọc danh sách tùy chọn dựa trên selectedCity
      // if (selectedCoquan) {
      //   // Nếu đã chọn một giá trị, lọc danh sách tùy chọn
      //   this.coquans = this.coquans.filter(
      //     (coquan) => coquan?.baiDang?.donViThucTap?.tenDvtt === selectedCoquan
      //   );
      // } else {
      //   // Nếu không có giá trị nào được chọn, hiển thị lại toàn bộ danh sách
      //   this.coquans = this.listCoQuan;
      // }
      this.selectedCoquan = event.value.baiDang.donViThucTap.maDvtt;
    }
  }
  filterDots(event: any) {
    if (!event.value && this.selectedDot !== this.initialDot) {
      this.selectedDot = this.initialDot;
    } else {
      const selectedDot = event.value.tenDot; // Lấy giá trị được chọn trong dropdown
      console.log(selectedDot);
      this.showDotValidationError = false;
      // Thực hiện lọc danh sách tùy chọn dựa trên selectedCity
      // if (selectedCoquan) {
      //   // Nếu đã chọn một giá trị, lọc danh sách tùy chọn
      //   this.coquans = this.coquans.filter(
      //     (coquan) => coquan?.baiDang?.donViThucTap?.tenDvtt === selectedCoquan
      //   );
      // } else {
      //   // Nếu không có giá trị nào được chọn, hiển thị lại toàn bộ danh sách
      //   this.coquans = this.listCoQuan;
      // }
      this.selectedDot = event.value.maDot;
    }
  }
  onSubmit() {
    if (!this.selectedCity) {
      // Hiển thị thông báo hoặc thực hiện hành động phù hợp, ví dụ:
      this.showCityValidationError = true;
      return;
    }

    if (!this.selectedCoquan) {
      // Hiển thị thông báo hoặc thực hiện hành động phù hợp, ví dụ:
      this.showCoquanValidationError = true;
      return;
    }
    if (!this.selectedDot) {
      // Hiển thị thông báo hoặc thực hiện hành động phù hợp, ví dụ:
      this.showDotValidationError = true;
      return;
    }
    if (this.selectedCity || this.selectedCoquan || this.selectedDot) {
      // Lấy giá trị được chọn từ dropdowns
      const selectedCityValue = this.selectedCity;
      const selectedCoquanValue = this.selectedCoquan;
      const selectedDotValue = this.selectedDot;
      // Bây giờ bạn có thể sử dụng giá trị này để thực hiện các xử lý cần thiết, ví dụ: gửi lên máy chủ hoặc hiển thị trong console
      console.log('Giảng viên đã chọn:', selectedCityValue);
      console.log('Cơ quan thực tập đã chọn:', selectedCoquanValue);
      console.log('Đợt thực tập đã chọn:', selectedDotValue);
      // Thực hiện các xử lý tiếp theo dựa trên giá trị đã lấy được
      const accountid = localStorage.getItem('accountid');
      this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
        const maSV = data.maSV; // Thay bằng giá trị tương ứng
        const maDvtt = this.selectedCoquan; // Thay bằng giá trị tương ứng
        const maGv = this.selectedCity; // Thay bằng giá trị tương ứng
        const maDot = this.selectedDot; // Thay bằng giá trị tương ứng

        this.dangkyThuctapService
          .createKetQuaThucTap(maSV, maDvtt, maGv, maDot)
          .subscribe(
            (response) => {
              this.isLoading = false;
              this.toastr.success('Đăng ký thành công');
              // Xử lý kết quả từ server nếu cần
              this.getAll();
              console.log(response);
            },
            (error) => {
              this.isLoading = false;
              this.toastr.error('Lỗi đăng ký thực tập');
              this.getAll();
              // Xử lý lỗi nếu có
              console.error(error);
            }
          );
      });
    }
  }
  openHuongDanDialog(): void {
    const dialogRef = this.dialog.open(HuongdanComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
