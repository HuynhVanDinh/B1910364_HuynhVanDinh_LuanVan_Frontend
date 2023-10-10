import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { SinhvienComponent } from './admin/sinhvien/sinhvien.component';
import { LayoutComponent } from './layout/layout.component';
import { LopComponent } from './admin/lop/lop.component';
import { KhoaComponent } from './admin/khoa/khoa.component';
import { ChartComponent } from './admin/chart/chart.component';
import { TestComponent } from './user/test/test.component';
import { PdfViewerComponent } from './admin/pdf-viewer/pdf-viewer.component';
import { ProvinceListComponent } from './admin/province-list/province-list.component';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';
import { DonviComponent } from './admin/donvi/donvi.component';
import { HeaderComponent } from './user/layout/header/header.component';
import { DangkiCoquanComponent } from './user/dangki-coquan/dangki-coquan.component';
import { DangkiThuctapComponent } from './user/dangki-thuctap/dangki-thuctap.component';
import { ThongtinSinhvienComponent } from './user/thongtin-sinhvien/thongtin-sinhvien.component';
import { ThongtinDangkiComponent } from './user/thongtin-dangki/thongtin-dangki.component';
import { KetquaThuctapComponent } from './user/ketqua-thuctap/ketqua-thuctap.component';
import { DangkiCuatoiComponent } from './user/dangki-cuatoi/dangki-cuatoi.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'student'] },
  },
  { path: 'error', component: ErrorComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        component: ChartComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'sinhvien',
        component: SinhvienComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'donvi',
        component: DonviComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'lop',
        component: LopComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'khoa',
        component: KhoaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'test',
        component: PdfViewerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'province',
        component: ProvinceListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'file',
        component: FileUploadComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
  {
    path: 'student',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
    children: [
      {
        path: '',
        component: ThongtinSinhvienComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'tienich',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'dkcq',
        component: DangkiCoquanComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'dktt',
        component: DangkiThuctapComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'ghidanh',
        component: ThongtinDangkiComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'list-dangki',
        component: DangkiCuatoiComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
      {
        path: 'ketqua',
        component: KetquaThuctapComponent,
        canActivate: [AuthGuard],
        data: { roles: ['student'] },
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
