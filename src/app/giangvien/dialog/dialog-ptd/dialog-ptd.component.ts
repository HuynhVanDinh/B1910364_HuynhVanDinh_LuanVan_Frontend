import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CongviecService } from 'src/app/congviec.service';
import { DanhgiaSinhvienService } from 'src/app/danhgia-sinhvien.service';
import { TuanService } from 'src/app/tuan.service';

@Component({
  selector: 'app-dialog-ptd',
  templateUrl: './dialog-ptd.component.html',
  styleUrls: ['./dialog-ptd.component.css'],
})
export class DialogPtdComponent implements OnInit {
  displayedColumns: string[] = ['tuan', 'congViec', 'danhGia', 'soBuoi'];

  // Make sure you have the 'CombinedData' array initialized
  combinedData: CombinedData[] = [];
  listTuan!: any[];
  constructor(
    private tuanService: TuanService,
    private danhgiaService: DanhgiaSinhvienService,
    private congViecService: CongviecService,
    public dialogRef: MatDialogRef<DialogPtdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    // console.log(this.data)
    this.getTuan();
  }
  // getTuan() {
  //   this.tuanService
  //     .getTuanCanBo(this.data.sinhvien.canBoHuongDan.maCB)
  //     .subscribe((res) => {
  //       console.log('tuần', res);
  //       this.listTuan = res;
  //       for (const tuan of this.listTuan) {
  //         this.congViecService
  //           .getAllCongViecBySinhVienAndTuan(
  //             this.data.sinhvien.sinhVien.maSV,
  //             tuan.id_tuan
  //           )
  //           .subscribe((congViec) => {
  //             console.log('Công việc tuần', tuan.id_tuan, congViec);
  //             this.getDanhgiaBySinhVien(tuan.id_tuan)
  //             // Process your tasks or update data related to each week here
  //           });
  //       }
  //     });
  // }
  // getDanhgiaBySinhVien(tuanId: number) {
  //   this.danhgiaService.getDanhGiaSinhVien(tuanId).subscribe((danhGia) => {
  //     console.log('Đánh giá', danhGia);
  //   });
  // }

  getTuan() {
    this.tuanService
      .getTuanCanBo(this.data.sinhvien.canBoHuongDan.maCB)
      .subscribe((res) => {
        this.listTuan = res;
        console.log('babababa', this.data.sinhvien.canBoHuongDan.maCB, res);
        const combinedData: CombinedData[] = [];

        for (const tuan of this.listTuan) {
          this.congViecService
            .getAllCongViecBySinhVienAndTuan(
              this.data.sinhvien.sinhVien.maSV,
              tuan.id_tuan
            )
            .subscribe((congViec) => {
              this.danhgiaService
                .getDanhGiaSinhVien(tuan.id_tuan)
                .subscribe((danhGia) => {
                  combinedData.push({
                    tuanId: tuan.id_tuan,
                    tenTuan: tuan.ten_tuan,
                    soBuoi: tuan.so_buoi,
                    batdau: tuan.batdau,
                    hethan:tuan.hethan,
                    congViec,
                    danhGia,
                  });
                  if (combinedData.length === this.listTuan.length) {
                    this.displayCombinedData(combinedData);
                  }
                });
            });
        }
      });
  }

  displayCombinedData(data: CombinedData[]) {
    this.combinedData = data;
    this.combinedData.sort((a, b) => a.tuanId - b.tuanId);
    // Use 'data' array to populate your table or other components
    console.log('Combined Data: ', data);
    // Your logic to display the data in a table or other UI components
    // You can loop through 'data' to show the information as needed.
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
  interface CombinedData {
  tuanId: number;
  tenTuan: string;
  soBuoi: number;
  batdau: Date;
  hethan: Date;
  congViec: any; // Replace 'any' with the type of your congViec data
  danhGia: any; // Replace 'any' with the type of your danhGia data
}
