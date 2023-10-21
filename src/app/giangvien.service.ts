import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiangvienService {
  private baseUrl = 'http://localhost:9004/api/giangvien';
  constructor(private http: HttpClient) {}
  getGiangVien(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }
  createGiangVien(
    tengv: string,
    khoaId: number | null,
    email: string,
    username: string,
    password: string,
    hinhAnh: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenGV: tengv,
      anhGV: hinhAnh,
    };
    return this.http.post<any>(url, body, {
      params: {
        khoaId: khoaId!.toString(),
        username: username,
        password: password,
        email: email,
      },
      headers: headers,
    });
  }
  editGiangVien(
    magv: number,
    tengv: string,
    khoaId: number | null,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + khoaId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      maGV: magv,
      tenGV: tengv,
    };
    return this.http.put<any>(url, body, {
      headers: headers,
    });
  }
}
