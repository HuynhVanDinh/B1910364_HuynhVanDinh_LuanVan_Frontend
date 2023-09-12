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
      { path: '', component: SinhvienComponent },
      { path: 'sinhvien', component: SinhvienComponent },
      { path: 'lop', component: LopComponent },
      { path: 'khoa', component: KhoaComponent}
    ],
  },
  {
    path: 'student',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
