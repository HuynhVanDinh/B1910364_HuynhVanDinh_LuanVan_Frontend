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
import { TestComponent } from './test/test.component';
import { PdfViewerComponent } from './admin/pdf-viewer/pdf-viewer.component';

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
    ],
  },
  {
    path: 'student',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
