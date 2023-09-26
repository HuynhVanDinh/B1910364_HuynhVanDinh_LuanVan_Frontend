import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
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

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.setDefaultLang('vn');
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
    // Lấy thông tin tài khoản đã đăng nhập từ AuthService
    // this.loggedInUser = this.authService.getLoggedInUser();
    this.loggedInUser = { name: this.username };
    console.log(this.loggedInUser);
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
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
}

