import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dangki-coquan',
  templateUrl: './dangki-coquan.component.html',
  styleUrls: ['./dangki-coquan.component.css'],
})
export class DangkiCoquanComponent implements OnInit {
  totalItems = 6; // Tổng số mục
  pageSize = 4; // Số mục trên mỗi trang
  currentPageIndex = 0; // Trang hiện tại
  displayedItems: number[] = []; // Mục hiển thị trên trang hiện tại
  ngOnInit() {
    // Khởi tạo danh sách các mục được hiển thị trên trang đầu tiên
    this.updateDisplayedItems();
  }
  // Hàm này được gọi khi người dùng chuyển trang
  pageChanged(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.updateDisplayedItems();
  }
  // Cập nhật danh sách mục được hiển thị trên trang hiện tại
  updateDisplayedItems() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = Array.from(
      { length: this.totalItems },
      (_, i) => i + 1
    ).slice(startIndex, endIndex);
  }
}
