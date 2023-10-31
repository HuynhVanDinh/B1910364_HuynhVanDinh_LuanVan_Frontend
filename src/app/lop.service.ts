import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LopService {
  private baseUrl = 'http://localhost:9004/api/lop';

  constructor(private http: HttpClient) {}
  getAllLop(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createLop(lop: string, khoaId: number, authToken: string): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenLop: lop,
    };
    return this.http.post<any>(url, body, {
      params: { khoaId: khoaId.toString() },
      headers: headers,
    });
  }
  editLop(
    id: number,
    lop: string,
    khoaId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenLop: lop,
    };
    return this.http.put<any>(url, body, {
      params: { khoaId: khoaId.toString() },
      headers: headers,
    });
  }
  phanCongGiangVien(
    id: number,
    maGV: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/phanconggiangvien/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });

    const params = new HttpParams().set('maGV', maGV.toString()); // Tạo tham số và đặt giá trị 'maGV'

    return this.http.put<any>(url, null, {
      params: params, // Truyền tham số vào yêu cầu
      headers: headers,
    });
  }

  searchLop(tenLop: string, authToken: string) {
    // Tạo URL với tham số tenSV
    const url = `${this.baseUrl}/search?tenLop=${tenLop}`;

    // Tạo tiêu đề (header) chứa token xác thực
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Gửi yêu cầu GET đến máy chủ với tiêu đề chứa token
    return this.http.get(url, { headers });
  }
}


