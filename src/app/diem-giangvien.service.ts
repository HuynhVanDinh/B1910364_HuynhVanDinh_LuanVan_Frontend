import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiemGiangvienService {
  private baseUrl = 'http://localhost:9004/api/diemgiangvien';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllBySinhVien(maSV: number): Observable<any> {
    const url = `${this.baseUrl}/sinhvien/${maSV}`;
    return this.http.get(this.baseUrl);
  }
  createDiemGiangVien(
    diem: Float32Array,
    maPhieu: number,
    sinhVienId: number,
    giangVienId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      diemGV: diem,
    };
    return this.http.post(url, body, {
      params: {
        maPhieu: maPhieu,
        maSV: sinhVienId,
        maGV: giangVienId,
      },
      headers: headers,
    });
  }
}
