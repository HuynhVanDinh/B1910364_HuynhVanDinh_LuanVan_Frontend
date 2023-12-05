import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhieudiemCanboService {
  private baseUrl = 'http://localhost:9004/api/phieudiemcanbo';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getByMuc(muc_id: number): Observable<any> {
    const url = `${this.baseUrl}/muc/${muc_id}`;
    return this.http.get(url);
  }
  createPhieu(
    noidung: string,
    muc: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      noiDungPD: noidung,
    };
    return this.http.post<any>(url, body, {
      params: { muc_id: muc },
      headers: headers,
    });
  }
  editPhieu(
    id: number,
    noidung: string,
    muc: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      noiDungPD: noidung,
    };
    return this.http.put<any>(url, body, {
      params: { muc_id: muc },
      headers: headers,
    });
  }
  delete(maPD: number, authToken: string): Observable<any> {
    const url = `${this.baseUrl}/${maPD}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.delete(url, {
      headers: headers,
    });
  }
}
