import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, switchMap, tap, timer } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9004/api/auth';
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private roles: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    //  this.refreshTokenPeriodically();
  }
  // private loggedInUser: any;

  // getLoggedInUser() {
  //   return this.loggedInUser;
  // }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/signin`, body).pipe(
      map((response: any) => {
        // Xử lý phản hồi và thiết lập thông tin tài khoản đã đăng nhập
        // this.loggedInUser = { name: response.username };
        localStorage.setItem('username', response.username);
        localStorage.setItem('accountid', response.id);
        return response; // Trả về phản hồi cho thành phần gọi để xử lý tiếp (nếu cần)
      })
    );
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Lưu trữ mã thông báo làm mới
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Truy xuất mã thông báo làm mới
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
  logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getAuthToken(),
      }),
    };
    //  this.roles.forEach((role) => {
    //    localStorage.removeItem(role);
    //  });
    // localStorage.removeItem(this.tokenKey);
    // localStorage.removeItem('username');
    // localStorage.removeItem(this.refreshTokenKey);
    // Xóa toàn bộ nội dung của localStorage
    localStorage.clear();
    return this.http.post(`${this.baseUrl}/signout`, {}, httpOptions);
  }

  setRoles(roles: string[]) {
    this.roles = roles;
  }
  saveRolesToLocalStorage(roles: string[]): void {
    localStorage.setItem('userRoles', JSON.stringify(roles));
  }

  hasRole(role: string): boolean {
    const userRoles = this.getRolesFromLocalStorage();
    return userRoles.includes(role);
  }

  getRolesFromLocalStorage(): string[] {
    const rolesJSON = localStorage.getItem('userRoles');
    return rolesJSON ? JSON.parse(rolesJSON) : [];
  }

  refreshToken(refreshToken: string): Observable<any> {
    const body = { refreshToken };
    return this.http.post(`${this.baseUrl}/refreshtoken`, body);
  }
  // refreshTokenPeriodically(): void  {
  //   // Lấy mã thông báo từ storage
  //   const refreshToken = this.getRefreshToken();
  //   console.log(refreshToken);
  //   if (refreshToken) {
  //     this.refreshToken(refreshToken).subscribe(
  //       (data: any) => {
  //         console.log('Token refreshed:', data);
  //         // Lưu trữ mã thông báo mới vào localStorage
  //         this.setAuthToken(data.accessToken);
  //       },
  //       (error) => {

  //         localStorage.clear;
  //         this.router.navigate(['/login']);
  //       }
  //     );
  //   }
  // }
  refreshTokenPeriodically(): Observable<any> {
    // Lấy mã thông báo từ storage
    const refreshToken = this.getRefreshToken();
    // console.log(refreshToken);

    // Kiểm tra nếu refreshToken không tồn tại
    if (!refreshToken) {
      return EMPTY; // Trả về một Observable rỗng
    }

    // Nếu có refreshToken, thực hiện gọi refreshToken và trả về kết quả
    return this.refreshToken(refreshToken).pipe(
      tap((data: any) => {
        this.setAuthToken(data.accessToken);
        console.log('Token refreshed:', data);
      }),
      catchError((error: any) => {
        console.log('Token refresh error:', error);
        // Xử lý lỗi bằng cách xóa localStorage và chuyển hướng đến trang đăng nhập
        localStorage.clear();
        this.router.navigate(['/login']);
        return EMPTY; // Trả về một Observable rỗng
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/forgotpassword`;
    const params = new HttpParams().set('email', email); // Tạo HttpParams với tham số email
    return this.http.post(url, null, { params }); // Gửi tham số email trong params
  }
}
