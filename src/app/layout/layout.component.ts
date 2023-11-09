import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { KhoaService } from '../khoa.service';
import { MultilevelNode } from 'ng-material-multilevel-menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  loggedInUser: any;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  currentLanguageImage: string = '../../assets/logo/vn.gif';
  username = localStorage.getItem('username');
  khoaList!: any[];
  menuData!: MultilevelNode[];
  menuItems!: any[];
  constructor(
    private khoaService: KhoaService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.loggedInUser = { name: this.username };
    console.log(this.loggedInUser);
    this.getAllKhoa();
  }
  getAllKhoa() {
    this.khoaService.getAllKhoa().subscribe((data) => {
      this.khoaList = data;
      // console.log('trước', this.khoaList);
      this.menuData = this.mapKhoaToMenuData();
      // console.log(this.menuData);
      this.menuItems = [
        {
          label: 'Trang chủ',
          icon: 'home',
          link: '/admin',
          // hrefTargetType: '_blank',
        },
        {
          label: 'Biểu mẫu',
          icon: 'file_present',
          items: [
            {
              label: 'Đánh giá của cán bộ',
              icon: 'edit_square',
              link: '/admin/phieudiemcanbo',
            },
            {
              label: 'Đánh giá của giảng viên',
              icon: 'edit_calendar',
              items: this.menuData,
            },
          ],
        },
        {
          label: 'Danh mục',
          icon: 'bookmark_manager',
          items: [
            {
              label: 'Quản lý sinh viên',
              link: '/admin/sinhvien',
              icon: 'person',
            },
            {
              label: 'Quản lý giảng viên',
              link: '/admin/giangvien',
              icon: 'personal_injury',
            },
            {
              label: 'Quản lý đơn vị',
              link: '/admin/donvi',
              icon: 'groups',
            },
          ],
        },

        {
          label: 'Thời gian',
          icon: 'pending_actions',
          items: [
            {
              label: 'Thời gian đăng ký',
              link: '/admin/thoigiandangky',
              icon: 'schedule',
            },
            {
              label: 'Đợt thực tập',
              link: '/admin/dotthuctap',
              icon: 'tab_recent',
            },
          ],
        },
        {
          label: 'Phân công giảng viên',
          link: '/admin/phanconggiangvien',
          icon: 'assignment_turned_in',
        },
        {
          label: 'Quản lý lớp',
          link: '/admin/lop',
          icon: 'add_home_work',
        },
        {
          label: 'Quản lý khoa',
          link: '/admin/khoa',
          icon: 'school',
        },
      ];
    });
  }
  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
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
  closeDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    console.log(this.isDrawerOpen);
  }
  changeLanguage(language: string) {
    if (language === 'vn') {
      this.currentLanguageImage = '../../assets/logo/vn.gif';
    } else if (language === 'en') {
      this.currentLanguageImage = '../../assets/logo/en.png';
    }
    this.translate.use(language);
  }
  mapKhoaToMenuData() {
    // console.log('sau', this.khoaList);
    if (this.khoaList) {
      // console.log('hihihihi');
      const a = this.khoaList.map((khoa) => ({
        label: khoa.khoaName,
        icon: 'edit_calendar',
        link: `/admin/phieudiemgiangvien/${khoa.khoaId}`,
      }));
      // console.log(a.length);
      return a;
    } else {
      // console.log('jbhjfhsgdttf');
      return [];
    }
  }
  // onMenuItemClick(khoaId: number) {
  //   if (khoaId) {
  //     // Truyền khoaId qua route
  //     this.router.navigate([`/admin/phieudiemgiangvien/${khoaId}`]);
  //   }
  // }
  config = {
    interfaceWithRoute: true,
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(0, 122, 27)',
    fontColor: 'white',
    backgroundColor: 'rgb(0, 122, 27)',
    selectedListFontColor: '#ff5733',
  };
}
