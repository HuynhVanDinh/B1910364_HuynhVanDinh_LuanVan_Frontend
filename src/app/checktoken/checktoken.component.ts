// checktoken.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checktoken',
  templateUrl: './checktoken.component.html',
  styleUrls: ['./checktoken.component.css'],
})
export class ChecktokenComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Kiểm tra token sau một khoảng thời gian cụ thể (ví dụ: 4 phút)
    // setTimeout(() => {
    //   this.authService.refreshTokenPeriodically;
    // }, 4 * 60 * 1000); // 4 phút

    // Hoặc sử dụng interval để kiểm tra định kỳ
    setInterval(() => {
      this.authService.refreshTokenPeriodically().subscribe(
        (data: any) => {
          console.log('Token refreshed:', data);
          // alert('Mã thông báo đã được làm mới thành công!');
        },
        (error: any) => {
          console.log('Token refresh error:', error);
          alert('Phiên đăng nhập hết hạn!!!');
        }
      );
    }, 1 * 60 * 1000);

    // Hoặc bạn có thể kết hợp cả hai cách trên để kiểm tra và cập nhật token.
  }

  // checkToken() {
  //   const shouldRefresh = this.authService.shouldRefreshToken(); // Hàm này kiểm tra xem có cần refresh token không
  //   if (shouldRefresh) {
  //     // Hiển thị một cửa sổ thông báo hoặc dialog để xác nhận refreshToken
  //     if (confirm('Token đã hết hạn. Bạn có muốn refresh token không?')) {
  //       this.authService.refreshTokenPeriodically().subscribe(
  //         (response) => {
  //           // Xử lý thành công khi refreshToken
  //         },
  //         (error) => {
  //           // Xử lý lỗi khi refreshToken
  //         }
  //       );
  //     }
  //   }
  // }
}
