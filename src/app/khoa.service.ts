import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KhoaService {
  private baseUrl = 'http://localhost:9004/api/khoa';

  constructor(private http: HttpClient) {}
  getAllKhoa(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  themkhoa(name: string, code: string, authToken: string): Observable<any> {
    const url = `${this.baseUrl}`;
    if (!name || !code) {
      return throwError('Vui lòng nhập đầy đủ thông tin.');
    }

    const body = {
      khoaName: name,
      khoaSdt: code,
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.post(url, body, { headers });
  }
  searchKhoa(tenKhoa: string, authToken: string) {
    // Tạo URL với tham số tenSV
    const url = `${this.baseUrl}/search?khoaName=${tenKhoa}`;

    // Tạo tiêu đề (header) chứa token xác thực
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Gửi yêu cầu GET đến máy chủ với tiêu đề chứa token
    return this.http.get(url, { headers });
  }
}
