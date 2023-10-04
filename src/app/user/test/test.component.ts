import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  items: MenuItem[] | undefined;

  position!: 'top'; // Đặt giá trị mặc định cho position

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom',
    },
    {
      label: 'Top',
      value: 'top',
    },
    {
      label: 'Left',
      value: 'left',
    },
    {
      label: 'Right',
      value: 'right',
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'sinhvien',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
      },
      {
        label: 'sinhvien',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
      },
      {
        label: 'Photos',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
      },
      {
        label: 'Trash',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
      },
    ];
  }
}
