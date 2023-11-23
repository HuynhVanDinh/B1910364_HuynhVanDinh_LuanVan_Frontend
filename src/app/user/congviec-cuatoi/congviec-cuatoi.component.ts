import { Component, OnInit } from '@angular/core';
import { CongviecService } from 'src/app/congviec.service';
import { KetquaService } from 'src/app/ketqua.service';
import { SinhvienService } from 'src/app/sinhvien.service';
import { TuanService } from 'src/app/tuan.service';

@Component({
  selector: 'app-congviec-cuatoi',
  templateUrl: './congviec-cuatoi.component.html',
  styleUrls: ['./congviec-cuatoi.component.css'],
})
export class CongviecCuatoiComponent implements OnInit {
  datas: any;
  tuans: any[] = [];
  constructor(
    private sinhvienService: SinhvienService,
    private ketquaService: KetquaService,
    private tuanService: TuanService,
    private congViecService: CongviecService
  ) {}
  ngOnInit() {
    this.getTuan();
  }
  getTuan() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.sinhvienService.getSinhVien(accountid).subscribe({
        next: (res) => {
          this.ketquaService
            .getAllKetQuaThucTapBySinhVien(res.maSV)
            .subscribe((data: any) => {
              // console.log(data)
              this.tuanService
                .getTuanCanBoSinhvien(data.canBoHuongDan.maCB)
                .subscribe((dataTuan) => {
                  console.log(dataTuan);
                  this.tuans = dataTuan;
                });
            });
          // this.datas = res;
          // console.log(this.datas);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
