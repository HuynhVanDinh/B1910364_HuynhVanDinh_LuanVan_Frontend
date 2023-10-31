import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CongviecService {
  private baseUrl = 'http://localhost:9004/api/congviec';
  constructor(private http: HttpClient) {}
  getAllCongViec(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }
  getAllCongViecBySinhVienAndTuan(
    sinhvienId: number,
    id_tuan: number
  ): Observable<any> {
    const url = `${this.baseUrl}/${sinhvienId}/${id_tuan}`;
    return this.http.get(url);
  }
  updateCongViec(
    id: number,
    tiendo: number,
    sinhVienId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/capnhattiendo/` + id;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tienDo: tiendo,
    };
    return this.http.put(url, body, {
      params: {
        sinhVienId: sinhVienId,
      },
      headers: headers,
    });
  }
}
