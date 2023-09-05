import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9004/api/auth';
  private tokenKey = 'authToken';
  refreshTokenKey!: string;
  private roles: string[] = [];

  constructor(private http: HttpClient) {
    //  this.refreshTokenPeriodically();
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/signin`, body);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getAuthToken(),
      }),
    };
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
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
  refreshTokenPeriodically(): void {
    // Sử dụng timer để chờ 5 phút sau khi bắt đầu
    timer(0, 5 * 60 * 1000) // 5 phút = 5 * 60 * 1000 ms
      .pipe(
        switchMap(() => {
          // Lấy mã thông báo từ storage
          const refreshToken = this.getAuthToken();
          if (refreshToken) {
            return this.refreshToken(refreshToken);
          }
          // Nếu không có mã thông báo, trả về Observable rỗng
          return new Observable();
        })
      )
      .subscribe(
        (data: any) => {
          console.log('Token refreshed:', data);
          // Lưu trữ mã thông báo mới vào localStorage
          this.setAuthToken(data.jwt);
        },
        (error) => {
          console.log('Token refresh error:', error);
        }
      );
  }
  forgotPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/forgotpassword`;
    const params = new HttpParams().set('email', email); // Tạo HttpParams với tham số email
    return this.http.post(url, null, { params }); // Gửi tham số email trong params
  }
}
