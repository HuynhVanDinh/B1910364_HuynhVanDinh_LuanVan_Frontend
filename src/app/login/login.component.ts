import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showError: boolean = false;
  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  // login() {
  //   this.authService.login(this.username, this.password).subscribe(
  //     (data) => {
  //       console.log('Login successful:', data);
  //       // Lưu trữ mã thông báo vào localStorage
  //       this.authService.setAuthToken(data.accessToken);

  //       console.log('token nè', this.authService.getAuthToken());

  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       console.log('Login error:', error);
  //       this.showError = true;
  //     }
  //   );
  // }
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        console.log('Login successful:', data);
        // Lưu trữ mã thông báo vào localStorage
        this.authService.setAuthToken(data.accessToken);
        this.authService.setRefreshToken(data.refreshToken);

        // Lưu trữ thông tin vai trò
        // this.authService.setRoles(data.roles);
         this.authService.saveRolesToLocalStorage(data.roles);

        console.log('token nè', this.authService.getAuthToken());
        console.log('refreshtoken nè', this.authService.getRefreshToken());
        switch (true) {
          case this.authService.hasRole('ROLE_ADMIN'):
            this.router.navigate(['/admin']); // Chuyển hướng đến trang admin
            break;
          case this.authService.hasRole('ROLE_STUDENT'):
            this.router.navigate(['/student']); // Chuyển hướng đến trang user
            break;
          default:
           this.showError = true;
        }
      },
      (error) => {
        console.log('Login error:', error);
        this.showError = true;
      }
    );
  }

  openForgotPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '300px',
    });
  }
}
