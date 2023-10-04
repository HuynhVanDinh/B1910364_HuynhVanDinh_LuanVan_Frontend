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

  getSinhVien(accountid: string | null): Observable<any> {
    const url = `${this.baseUrl}/account/${accountid}`;
    console.log(url);
    return this.http.get(url);
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
  createSinhVien(
    tensv: string,
    ngaysinh: Date,
    gioitinh: string,
    quequan: string,
    lopId: number | null,
    email: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenSV: tensv,
      ngaySinh: ngaysinh,
      gioiTinh: gioitinh,
      queQuan: quequan,
    };
    return this.http.post<any>(url, body, {
      params: { lopId: lopId!.toString(), email: email },
      headers: headers,
    });
  }
  updateSinhVien(
    masv: number,
    tensv: string,
    ngaysinh: Date,
    gioitinh: string,
    quequan: string,
    lopId: number | null,
    email: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + masv;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenSV: tensv,
      ngaySinh: ngaysinh,
      gioiTinh: gioitinh,
      queQuan: quequan,
    };
    // console.log(body);
    return this.http.put<any>(url, body, {
      params: { lopId: lopId!.toString(), email: email },
      headers: headers,
    });
  }
}
