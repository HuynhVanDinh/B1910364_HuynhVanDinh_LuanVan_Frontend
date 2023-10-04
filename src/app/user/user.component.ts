import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  isMenuOpen = false;
  // Sử dụng HostListener để theo dõi sự thay đổi kích thước trình duyệt
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.isMenuOpen = false; // Ẩn menu di động trên màn hình lớn hơn hoặc bằng 768px
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('isMenuOpen:', this.isMenuOpen);
  }
}
