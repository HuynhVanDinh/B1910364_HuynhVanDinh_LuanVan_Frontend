import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SinhvienService {
  private baseUrl = 'http://localhost:9004/api/sinhvien';

  constructor(private http: HttpClient) {}

  getAllSinhVien(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  searchSinhVien(tenSV: string, authToken: string) {
    // Tạo URL với tham số tenSV
    const url = `${this.baseUrl}/search?tenSV=${tenSV}`;

    // Tạo tiêu đề (header) chứa token xác thực
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Gửi yêu cầu GET đến máy chủ với tiêu đề chứa token
    return this.http.get(url, { headers });
  }
}
