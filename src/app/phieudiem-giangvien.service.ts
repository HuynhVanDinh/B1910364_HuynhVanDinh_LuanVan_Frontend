import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhieudiemGiangvienService {
  private baseUrl = 'http://localhost:9004/api/phieudiemgiangvien';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getByKhoa(khoaId: number): Observable<any> {
    const url = `${this.baseUrl}/khoa/${khoaId}`;
    return this.http.get(url);
  }
  getByMuc(muc_id: number): Observable<any> {
    const url = `${this.baseUrl}/muc/${muc_id}`;
    return this.http.get(url);
  }
  createPhieu(
    noidung: string,
    diemMax: Float32Array,
    muc: number,
    khoaId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      noiDungPDGV: noidung,
      diemMax: diemMax,
    };
    return this.http.post<any>(url, body, {
      params: { muc_id: muc, khoaId: khoaId },
      headers: headers,
    });
  }
  editPhieu(
    id: number,
    noidung: string,
    diemMax: Float32Array,
    muc: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      noiDungPDGV: noidung,
      diemMax: diemMax,
    };
    return this.http.put<any>(url, body, {
      params: { muc_id: muc },
      headers: headers,
    });
  }
}
