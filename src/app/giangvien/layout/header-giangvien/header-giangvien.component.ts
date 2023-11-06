import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header-giangvien',
  templateUrl: './header-giangvien.component.html',
  styleUrls: ['./header-giangvien.component.css'],
})
export class HeaderGiangvienComponent implements OnInit {
  componentBackgroundColor: string = '#ececec';
  items: MenuItem[] | undefined;
  dockVisible: boolean = false;
  currentDockItem: any | null = null;
  position!: 'right';
  showScrollButton: boolean = false;
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
  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() isMenuOpen: boolean = false;
  @Output() navigate = new EventEmitter<string>();
  ngOnInit() {
    this.items = [
      {
        label: 'dkcq',
        title: 'Đăng kí cơ quan',
        icon: 'https://dkmh.ctu.edu.vn/htql/sinhvien/images/phanhe/hetinchi.gif',
      },
      {
        label: 'sinhvien',
        title: 'Đăng kí thực tập',
        icon: 'https://dkmh.ctu.edu.vn/htql/sinhvien/images/phanhe/korganizer.png',
      },
      {
        label: 'Photos',
        title: 'Kết quả thực tập',
        icon: 'https://dkmh.ctu.edu.vn/htql/sinhvien/images/phanhe/ql_diem.gif',
      },
      {
        label: 'Trash',
        title: 'Đăng kí cơ quan',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
      },
    ];
    // Đọc màu nền từ localStorage
    const savedBackgroundColor = localStorage.getItem(
      'componentBackgroundColor'
    );
    if (savedBackgroundColor) {
      this.componentBackgroundColor = savedBackgroundColor;
    }
  }
  constructor(private authService: AuthService, private router: Router) {}
  toggleDockVisibility() {
    this.dockVisible = !this.dockVisible;
  }
  toggleMenu() {
    this.menuToggle.emit(true);
  }
  menuItems: { label: string; route: string }[] = [
    { label: 'Trang chủ', route: '/lecturer/' },
    { label: 'Về chúng tôi', route: '/about' },
    { label: 'Dịch vụ', route: '/services' },
    { label: 'Liên hệ', route: '/contact' },
    { label: 'Đăng xuất', route: '/logout' },
  ];

  // Hàm xử lý sự kiện khi nút trở về đầu trang được nhấp
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn đến đầu trang một cách mượt mà
  }

  // Xử lý sự kiện khi cuộn trang
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Kiểm tra vị trí hiện tại của cuộn trang, chẳng hạn là khi cuộn xuống 200px thì hiển thị nút
    if (window.pageYOffset > 200) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }
  // Theo dõi sự thay đổi kích thước màn hình
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // Lấy kích thước màn hình
    const screenWidth = window.innerWidth;

    // Kiểm tra kích thước và cập nhật biến cờ
    this.isMenuOpen = screenWidth <= 768; // Điều chỉnh kích thước tùy chọn
  }
  navigateTo(section: string) {
    this.navigate.emit(section);
    // Thực hiện điều hướng đến route được chỉ định
  }
  sidebarVisible: boolean = false;

  showSidebar() {
    this.sidebarVisible = true;
  }

  hideSidebar() {
    this.sidebarVisible = false;
  }
  changeComponentBackgroundColor() {
    // Thay đổi màu nền của component
    if (this.componentBackgroundColor === '#ececec') {
      this.componentBackgroundColor = 'lightblue';
    } else {
      this.componentBackgroundColor = '#ececec';
    }
    localStorage.setItem(
      'componentBackgroundColor',
      this.componentBackgroundColor
    );
  }
  // Xác định hàm xử lý sự kiện di chuột qua một mục
  onDockItemMouseOver(item: any) {
    this.currentDockItem = item;
  }

  // Hàm xử lý sự kiện di chuột ra khỏi một mục
  onDockItemMouseOut() {
    this.currentDockItem = null;
  }
  logout() {
    this.authService.logout().subscribe(
      (data) => {
        console.log('Logout successful:', data);
        // Redirect to login page or perform necessary actions.
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }
}
