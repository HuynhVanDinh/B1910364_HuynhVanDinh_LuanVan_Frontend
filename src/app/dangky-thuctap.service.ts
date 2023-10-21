import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DangkyThuctapService {
  private baseUrl = 'http://localhost:9004/api/ketquathuctap';
  constructor(private http: HttpClient) {}
  getAllKetQuaThucTap(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllKetQuaThucTapSinhVien(masv: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/masv/${masv}`);
  }
  createKetQuaThucTap(
    maSV: number,
    maDvtt: number,
    maGv: number,
    maDot: number
  ): Observable<any> {
    // Tạo một đối tượng dữ liệu để gửi lên server, có thể là một đối tượng JSON tuỳ theo yêu cầu của API
    const data = {
      maSV: maSV,
      maDvtt: maDvtt,
      maGv: maGv,
      maDot: maDot,
    };

    // Thực hiện yêu cầu POST đến API
    return this.http.post(
      `${this.baseUrl}/${maSV}/${maDvtt}/${maGv}/${maDot}`,
      data
    );
  }
}
