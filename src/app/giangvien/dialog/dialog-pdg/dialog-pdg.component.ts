import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { th } from 'date-fns/locale';
import { forkJoin, map, switchMap } from 'rxjs';
import { DiemCanboService } from 'src/app/diem-canbo.service';
import { MucDanhgiaCanboService } from 'src/app/muc-danhgia-canbo.service';
import { MucDanhgiaGiangvienService } from 'src/app/muc-danhgia-giangvien.service';
import { PhieudiemCanboService } from 'src/app/phieudiem-canbo.service';

@Component({
  selector: 'app-dialog-pdg',
  templateUrl: './dialog-pdg.component.html',
  styleUrls: ['./dialog-pdg.component.css'],
})
export class DialogPdgComponent implements OnInit {
  listMuc!: any[];
  mucList: any[] = [];
  listPhieu!: any[];
  diemPD!: any;
  combinedData: CombinedData[] = [];
  displayedColumns: string[] = ['noidung', 'diem'];
  constructor(
    private phieudiemCanboService: PhieudiemCanboService,
    private mucDanhGiaCanBoService: MucDanhgiaCanboService,
    private diemCanboService: DiemCanboService,
    public dialogRef: MatDialogRef<DialogPdgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.getMuc();
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  // getMuc() {
  //   // console.log(this.data.sinhvien.sinhVien.lop.khoa.khoaName);
  //   this.mucDanhGiaCanBoService.getAll().subscribe((res) => {
  //     console.log(res);
  //     this.listMuc = res;
  //     const combinedData: CombinedData[] = [];
  //     for (const muc of this.listMuc) {
  //       this.phieudiemCanboService.getByMuc(muc.mucId).subscribe((noidung) => {
  //         console.log(muc, noidung);
  //         console.log(this.data.sinhvien.sinhVien.maSV);
  //         this.listPhieu = noidung;
  //         for (const phieu of this.listPhieu) {
  //           this.diemCanboService
  //             .getByPhieu(phieu.maPDCB, this.data.sinhvien.sinhVien.maSV)
  //             .subscribe((diem) => {
  //               console.log(diem);
  //               this.diemPD = diem;
  //             });
  //         }
  //          combinedData.push({
  //            mucId: muc.mucId,
  //            tenMuc: muc.tenMuc,
  //            noidung: noidung,
  //            diem: this.diemPD,
  //          });
  //          if (combinedData.length === this.listMuc.length) {
  //            this.displayCombinedData(combinedData);
  //          }
  //       });
  //     }
  //   });
  // }
  getMuc(): void {
    this.mucDanhGiaCanBoService.getAll().subscribe(
      (mucList) => {
        console.log(mucList);
        this.mucList = mucList;
        this.processCombinedData();
      },
      (error) => {
        console.error('Error loading mucList:', error);
      }
    );
  }
  // displayCombinedData(data: CombinedData[]) {
  //   this.combinedData = data;
  //   this.combinedData.sort((a, b) => a.mucId - b.mucId);
  //   // Use 'data' array to populate your table or other components
  //   console.log('Combined Data: ', data);
  //   // Your logic to display the data in a table or other UI components
  //   // You can loop through 'data' to show the information as needed.
  // }
  processCombinedData(): void {
    const observables = this.mucList.map((muc) =>
      this.phieudiemCanboService.getByMuc(muc.mucId).pipe(
        switchMap((noidung) => {
          console.log(muc, noidung);
          console.log(this.data.sinhvien.sinhVien.maSV);
          this.listPhieu = noidung;
          const diemObservables = this.listPhieu.map((phieu) =>
            this.diemCanboService.getByPhieu(
              phieu.maPDCB,
              this.data.sinhvien.sinhVien.maSV
            )
          );

          return forkJoin(diemObservables).pipe(
            map((diems) => ({
              mucId: muc.mucId,
              tenMuc: muc.tenMuc,
              noidung: noidung,
              diem: diems,
            }))
          );
        })
      )
    );

    forkJoin(observables).subscribe(
      (combinedData) => {
        this.displayCombinedData(combinedData);
      },
      (error) => {
        console.error('Error loading combinedData:', error);
      }
    );
  }

  displayCombinedData(data: CombinedData[]): void {
    this.combinedData = data;
    this.combinedData.sort((a, b) => a.mucId - b.mucId);
    console.log('Combined Data: ', data);
  }

  calculateTotalScoreForAllRows(data: any[]): number {
    let totalScore = 0;

    for (const row of data) {
      for (const item of row.diem) {
        totalScore += item.diemCB;
      }
    }

    return totalScore;
  }
}
interface CombinedData {
  mucId: number;
  tenMuc: string;
  noidung: any;
  diem: any;
}
