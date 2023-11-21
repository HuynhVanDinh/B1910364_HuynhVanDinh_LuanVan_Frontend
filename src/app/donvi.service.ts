import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonviService {
  private baseUrl = 'http://localhost:9004/api/donvithuctap';

  constructor(private http: HttpClient) {}
  getAllDonVi(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllDonViByKhoa(): Observable<any> {
    const url = `${this.baseUrl}/coquan-khoa`;
    return this.http.get(url);
  }
  createDonvi(
    tenDv: string,
    diaChi: string,
    soDt: string,
    email: string,
    isKhoa: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenDvtt: tenDv,
      diaChi: diaChi,
      soDt: soDt,
      isKhoa: isKhoa,
    };
    return this.http.post<any>(url, body, {
      params: { email: email },
      headers: headers,
    });
  }
  editDonvi(
    id: number,
    tenDv: string,
    diaChi: string,
    soDt: string,
    email: string,
    isKhoa: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenDvtt: tenDv,
      diaChi: diaChi,
      soDt: soDt,
      isKhoa: isKhoa,
    };
    return this.http.put<any>(url, body, {
      params: { email: email },
      headers: headers,
    });
  }
  searchDonVi(tenDvtt: string, authToken: string) {
    // Tạo URL với tham số tenSV
    const url = `${this.baseUrl}/search?tenDvtt=${tenDvtt}`;

    // Tạo tiêu đề (header) chứa token xác thực
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Gửi yêu cầu GET đến máy chủ với tiêu đề chứa token
    return this.http.get(url, { headers });
  }
}
