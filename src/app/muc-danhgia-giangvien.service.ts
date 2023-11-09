import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MucDanhgiaGiangvienService {
  private baseUrl = 'http://localhost:9004/api/mucdanhgiacuagiangvien';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getMucByKhoa(khoaId: number): Observable<any> {
    const url = `${this.baseUrl}/khoa/${khoaId}`;
    return this.http.get(url);
  }
  createMuc(
    khoaId: number,
    tenMuc: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenMuc: tenMuc,
    };
    return this.http.post<any>(url, body, {
      params: { khoaId: khoaId.toString() },
      headers: headers,
    });
  }
  editMuc(
    id: number,
    // khoaId: number,
    tenMuc: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenMuc: tenMuc,
    };
    return this.http.put<any>(url, body, {
      // params: { khoaId: khoaId.toString() },
      headers: headers,
    });
  }
}
