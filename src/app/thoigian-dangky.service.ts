import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThoigianDangkyService {
  private baseUrl = 'http://localhost:9004/api/thoigiandangky';

  constructor(private http: HttpClient) {}

  getAllThoiGianDangKy(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllThoiGianDangKyKhoa(khoaid: number): Observable<any> {
    const url = `${this.baseUrl}/khoa`;
    return this.http.get(url, {
      params: { khoaId: khoaid },
    });
  }
  createThoiGianDangKy(
    tgbd: Date,
    tgkt: Date,
    ghichu: string,
    khoaId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tgbd: tgbd,
      tgkt: tgkt,
      ghichu: ghichu,
    };
    return this.http.post<any>(url, body, {
      params: { khoaid: khoaId },
      headers: headers,
    });
  }
  editThoiGianDangKy(
    id: number,
    tgbd: Date,
    tgkt: Date,
    ghichu: string,
    khoaId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tgbd: tgbd,
      tgkt: tgkt,
      ghichu: ghichu,
    };
    return this.http.put<any>(url, body, {
      params: { khoaid: khoaId },
      headers: headers,
    });
  }
}
