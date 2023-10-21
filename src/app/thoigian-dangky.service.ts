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
    return this.http.get(url,{
      params: { khoaId: khoaid }});
  }
  createThoiGianDangKy(
    tgbd: Date,
    tgkt: Date,
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
    };
    return this.http.post<any>(url, body, {
      params: { khoaId: khoaId.toString() },
      headers: headers,
    });
  }
}
