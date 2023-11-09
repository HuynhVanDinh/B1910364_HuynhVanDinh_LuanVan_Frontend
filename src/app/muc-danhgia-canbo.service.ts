import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MucDanhgiaCanboService {
  private baseUrl = 'http://localhost:9004/api/mucdanhgiacuacanbo';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createMuc(tenMuc: string, authToken: string): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenMuc: tenMuc,
    };
    return this.http.post<any>(url, body, {
      headers: headers,
    });
  }
  editMuc(
    id: number,
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
