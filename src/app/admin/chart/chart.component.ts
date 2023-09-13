import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit{
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
  // // Dữ liệu và cấu hình biểu đồ
  // data: any;
  // options: any;

  // constructor() {
  //   // Khởi tạo dữ liệu và cấu hình biểu đồ ở đây
  //   this.data = {
  //     labels: ['January', 'February', 'March', 'April', 'May'],
  //     datasets: [
  //       {
  //         label: 'Sample Data',
  //         data: [65, 59, 80, 81, 56],
  //       },
  //     ],
  //   };

  //   this.options = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //   };
  // }
}
