import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DangkiService {
  private baseUrl = 'http://localhost:9004/api/dangky';
  constructor(private http: HttpClient) {}
  getAllDangky(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createDangky(
    cv: string,
    bangDiem: string,
    baiDangId: string | null,
    sinhVienId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      bangDiem: bangDiem,
      cv: cv,
    };
    // console.log('Cv nè', cv);
    return this.http.post<any>(url, body, {
      params: { baiDangId: baiDangId!.toString(), sinhVienId: sinhVienId },
      headers: headers,
    });
  }
  isBaiDang(sinhVienId: number, baiDangId: number): Observable<any> {
    const url = `${this.baseUrl}/check-registration`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    // Gửi yêu cầu kiểm tra việc đăng ký
    return this.http.get<any>(url, {
      params: {
        sinhVienId: sinhVienId.toString(),
        baiDangId: baiDangId.toString(),
      },
      headers: headers,
    });
  }
  getBaiDangDaDangKyCuaSinhVien(sinhVienId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/${sinhVienId}/baidangdadangky`
    );
  }
}
