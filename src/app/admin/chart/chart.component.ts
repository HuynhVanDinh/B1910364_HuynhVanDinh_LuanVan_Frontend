import { Component, numberAttribute, OnInit } from '@angular/core';
import { BaidangService } from 'src/app/baidang.service';
import { DonviService } from 'src/app/donvi.service';
import { DotthuctapService } from 'src/app/dotthuctap.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { KetquaService } from 'src/app/ketqua.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  data: any;
  sl_sinhvien!: number;
  sl_giangvien!: number;
  sl_donvi!: number;
  sl_baidang!: number;
  options: any;
  listdot!: any;
  listdata!: any;
  constructor(
    private sinhvienService: SinhvienService,
    private giangVienService: GiangvienService,
    private donviService: DonviService,
    private baidangService: BaidangService,
    private ketQuaThucTapService: KetquaService,
    private dotThucTapService: DotthuctapService
  ) {}
  ngOnInit() {
    this.getSinhVien();
    this.getgiangvien();
    this.getdonvi();
    this.getbaidang();
    this.getdot();
  }
  getSinhVien() {
    this.sinhvienService.getAllSinhVien().subscribe((data) => {
      // console.log(data);
      this.sl_sinhvien = data.length;
    });
  }
  getgiangvien() {
    this.giangVienService.getGiangVien().subscribe((data) => {
      // console.log(data);
      this.sl_giangvien = data.length;
    });
  }
  getdonvi() {
    this.donviService.getAllDonVi().subscribe((data) => {
      this.sl_donvi = data.length;
    });
  }
  getbaidang() {
    this.baidangService.getAllBaiDang().subscribe((data) => {
      this.sl_baidang = data.length;
    });
  }
  // getdot() {
  //   this.dotThucTapService.getAllDotthuctap().subscribe((data) => {
  //     this.listdot = data;
  //     for (const dot of this.listdot) {
  //       this.ketQuaThucTapService
  //         .getAllKetQuaThucTapByDot(dot.maDot)
  //         .subscribe((res) => {
  //           console.log('huỳi', res);
  //           this.listdata = res;
  //           const dataArray = this.listdata.map(
  //             (makqtt: { maKqtt: any }) => makqtt.maKqtt
  //           );
  //           console.log(dataArray.length)
  //           const tenDotArray = this.listdot.map(
  //             (dot: { tenDot: any }) => dot.tenDot
  //           );
  //           const documentStyle = getComputedStyle(document.documentElement);
  //           const textColor = documentStyle.getPropertyValue('--text-color');

  //           this.data = {
  //             labels: tenDotArray,
  //             // labels: [
  //             //   'Học kỳ hè(2020-2021)',
  //             //   'Học kỳ hè(2021-2022)',
  //             //   'Học kỳ hè(2023-2024)',
  //             //   'Học kỳ hè(2025-2026)',
  //             //   'Học kỳ hè(2027-2028)',
  //             // ],
  //             datasets: [
  //               {
  //                 label: 'Sinh viên thực tập',
  //                 data: [2,1],
  //                 backgroundColor: ['rgb(183, 255, 189)'],
  //                 // hoverBackgroundColor: [
  //                 //   documentStyle.getPropertyValue('rgb(115, 172, 128)'),
  //                 // ],
  //               },
  //             ],
  //           };

  //           this.options = {
  //             responsive: true,
  //             // maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                   color: textColor,
  //                 },
  //               },
  //             },
  //           };
  //         });
  //     }
  //   });
  // }
  // getdot() {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   this.dotThucTapService.getAllDotthuctap().subscribe((data) => {
  //     this.listdot = data;
  //     const lengthsArray: number[] = [];
  //     for (const dot of this.listdot) {
  //       this.ketQuaThucTapService
  //         .getAllKetQuaThucTapByDot(dot.maDot)
  //         .subscribe((res) => {
  //           console.log('huỳi', res);
  //           this.listdata = res;
  //           const propertyNames = Object.keys(this.listdata);
  //           const numberOfProperties = propertyNames.length;

  //           // console.log('Number of Properties:', numberOfProperties);

  //           lengthsArray.push(numberOfProperties);
  //           console.log(lengthsArray);

  //           // Update the data property based on the length of dataArray
  //           this.data = {
  //             labels: this.listdot.map((dot: { tenDot: any }) => dot.tenDot),
  //             datasets: [
  //               {
  //                 label: 'Sinh viên thực tập',
  //                 data: lengthsArray,
  //                 backgroundColor: ['rgb(183, 255, 189)'],
  //               },
  //             ],
  //           };

  //           this.options = {
  //             responsive: true,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                   color: textColor,
  //                 },
  //               },
  //             },
  //           };
  //         });
  //     }
  //   });
  // }
  getdot() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.dotThucTapService.getAllDotthuctap().subscribe((data) => {
      this.listdot = data;
      const lengthsArray: { maDot: any; tenDot: any; length: number }[] = [];

      const findIndexByMaDot = (maDot: any) =>
        lengthsArray.findIndex((item) => item.maDot === maDot);

      for (const dot of this.listdot) {
        this.ketQuaThucTapService
          .getAllKetQuaThucTapByDot(dot.maDot)
          .subscribe((res) => {
            // console.log('huỳi', res);
            this.listdata = res;
            const propertyNames = Object.keys(this.listdata);
            const numberOfProperties = propertyNames.length;

            const index = findIndexByMaDot(dot.maDot);

            if (index === -1) {

              lengthsArray.push({
                maDot: dot.maDot,
                tenDot: dot.tenDot,
                length: numberOfProperties,
              });
            } else {
              lengthsArray[index].length = numberOfProperties;
            }


            lengthsArray.sort((a, b) => a.maDot - b.maDot);

            this.data = {
              labels: lengthsArray.map((item) => item.tenDot),
              datasets: [
                {
                  label: 'Sinh viên thực tập',
                  data: lengthsArray.map((item) => item.length),
                  backgroundColor: ['rgb(183, 255, 189)'],
                },
              ],
            };

            this.options = {
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                    color: textColor,
                  },
                },
              },
            };
          });
      }
    });
  }

  // Dữ liệu và cấu hình biểu đồ
  // data: any;
  // options: any;

  // constructor() {
  //   // Khởi tạo dữ liệu và cấu hình biểu đồ ở đây
  //   this.data = {
  //     labels: ['January', 'February', 'March', 'April', 'May'],
  //     datasets: [
  //       {
  //         label: 'Sample Data',
  //         data: [540, 325, 702, 604, 900],
  //       },
  //     ],
  //   };

  //   this.options = {
  //     responsive: true,
  //     maintainAspectRatio: false,

  //   };
}
