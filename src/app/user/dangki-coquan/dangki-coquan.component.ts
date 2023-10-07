import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaidangService } from 'src/app/baidang.service';

@Component({
  selector: 'app-dangki-coquan',
  templateUrl: './dangki-coquan.component.html',
  styleUrls: ['./dangki-coquan.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class DangkiCoquanComponent implements OnInit {
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  constructor(private baidangService: BaidangService) {}
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.baidangService.getAllBaiDang().subscribe({
      next: (res) => {
        // console.log(res);
        // Khởi tạo MatTableDataSource và thiết lập paginator
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
    });
  }
  onPageChange(event: any) {
    // Xử lý sự kiện khi người dùng thay đổi trang
    this.pageSize = event.pageSize;
  }
}
