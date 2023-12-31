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
  getGiangVienById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }
  getGiangVienByAccount(accountid: string | null): Observable<any> {
    const url = `${this.baseUrl}/account/${accountid}`;
    console.log(url);
    return this.http.get(url);
  }
  getGiangVienByKhoa(khoaId: number): Observable<any> {
    const url = `${this.baseUrl}/khoa/` + khoaId;
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
  editTenGiangVien(
    magv: string | null,
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
  updateAvt(
    magv: string | null,
    hinhAnh: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${magv}/capnhatanhdien`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });

    // Đưa tên tệp hình ảnh vào trực tiếp, không cần bọc trong một đối tượng
    return this.http.put<any>(url, hinhAnh, {
      headers: headers,
    });
  }
}
