import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KetquaService {
  private baseUrl = 'http://localhost:9004/api/ketquathuctap';
  constructor(private http: HttpClient) {}
  getAllKetQuaThucTap(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllKetQuaThucTapBySinhVien(masv: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/masv/${masv}`);
  }
  getAllKetQuaThucTapByGiangVien(magv: string | null, trangThai: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/magv/${magv}/${trangThai}`);
  }
  // getAllKetQuaCanBo(macb: number, trangThai: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/macb/${macb}/${trangThai}`);
  // }
  getAllKetQuaThucTapByDot(maDot: number | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dot/${maDot}`);
  }
  chamDiem(
    maKqtt: number,
    diem: number,
    maGv: number,
    maCB: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/diem/${maGv}`;
    const body = {
      maKqtt: maKqtt,
      diem: diem,
      canbo: maCB,
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.put<any>(url, body, { headers });
  }
}
