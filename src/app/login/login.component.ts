import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import {
  MoveDirection,
  ClickMode,
  HoverMode,
  OutMode,
  Container,
  Engine,
} from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  id = 'tsparticles';

  particlesOptions = {
    // background: {
    //   color: {
    //     value: '#0d47a1',
    //   },
    // },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push,
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse,
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };
  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }
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
          case this.authService.hasRole('ROLE_LECTURER'):
            this.router.navigate(['/lecturer']); // Chuyển hướng đến trang user
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
