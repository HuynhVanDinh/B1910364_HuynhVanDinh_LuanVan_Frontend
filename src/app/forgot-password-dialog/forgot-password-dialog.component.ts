import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css'],
})
export class ForgotPasswordDialogComponent implements OnInit {
  isLoading: boolean = false;
  email: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // Gọi hàm để ẩn thông báo sau 3 giây
    this.hideMessageAfterDelay(3000);
  }
  sendForgotPasswordRequest() {
    // Kiểm tra định dạng email trước khi gửi yêu cầu
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this.message = 'Định dạng email không hợp lệ.';
      this.isError = true;
      this.hideMessageAfterDelay(3000);
      return;
    }
    this.isLoading = true;
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        this.message = response.message;
        this.isError = false;
        this.isLoading = false;
        setTimeout(() => {
          this.dialogRef.close();
        }, 4000);
      },
      (error) => {
        this.message = error.error.message;
        this.isLoading = false;
        this.isError = true;
      }
    );
    this.hideMessageAfterDelay(3000);
  }
  private hideMessageAfterDelay(delay: number) {
    setTimeout(() => {
      this.message = '';
      this.isError = false;
    }, delay);
  }
}
