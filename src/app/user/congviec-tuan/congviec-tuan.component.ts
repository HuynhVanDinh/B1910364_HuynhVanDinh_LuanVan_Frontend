import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CongviecService } from 'src/app/congviec.service';
import { KetquaService } from 'src/app/ketqua.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-congviec-tuan',
  templateUrl: './congviec-tuan.component.html',
  styleUrls: ['./congviec-tuan.component.css'],
})
export class CongviecTuanComponent implements OnInit {
  @Input() tuan!: any;
  selectedCongviec: any[] = [];
  listCongViec: any[] = [];
  progressValue = 0;
  displayedColumns: string[] = [
    'Mã công việc',
    'Mô tả công việc',
    'Tiến độ',
    'Cập nhật tiến độ',
    'Trạng thái',
  ];
  isLoading: boolean = false;
  constructor(
    private sinhvienService: SinhvienService,
    private ketquaService: KetquaService,
    // private tuanService: TuanService,
    private toastr: ToastrService,
    private congViecService: CongviecService
  ) {}
  ngOnInit(): void {
    this.getAllCongViecBySinhvien();
  }
  getAllCongViecBySinhvien() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.sinhvienService.getSinhVien(accountid).subscribe({
        next: (res) => {
          this.congViecService
            .getAllCongViecBySinhVienAndTuan(res.maSV, this.tuan.id_tuan)
            .subscribe((data) => {
              console.log('cv nè', data);
              this.listCongViec = data;
            });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  capNhatCongViec(macv: number, congviec: number) {
    const accountid = localStorage.getItem('accountid');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    if (accountid) {
      this.isLoading = true;
      this.sinhvienService.getSinhVien(accountid).subscribe({
        next: (res) => {
          this.congViecService
            .updateCongViec(macv, congviec, res.maSV, authToken)
            .subscribe((data) => {
              this.isLoading = false;
              this.toastr.success('Cập nhật thành công');
              // Xử lý kết quả từ server nếu cần
              this.getAllCongViecBySinhvien();
              console.log('Cập nhật công việc:');
            },
            (error)=>{
              this.toastr.error(error.error.message);
               this.getAllCongViecBySinhvien();
            });
        },
        // error: (error) => {
        //   this.toastr.error('Cập nhật thất bại');
        //   // Xử lý kết quả từ server nếu cần
        //   this.getAllCongViecBySinhvien();
        //   console.error(error);
        // },
      });
    }
  }
  updateProgressBar() {
    const totalCongViec = this.listCongViec.length;
    const selectedCongViecCount = this.selectedCongviec.length;

    // Tính phần trăm hoàn thành
    this.progressValue = (selectedCongViecCount / totalCongViec) * 100;
  }
}
