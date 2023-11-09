import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BieumauService {
  private baseUrl = 'http://localhost:9004/api/phieudiemgiangvien';

  constructor(private http: HttpClient) {}

  getAllBieuMau(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getBieuMauByKhoa(khoaId: string): Observable<any> {
    const url = `${this.baseUrl}/khoa/${khoaId}`;
    return this.http.get(url);
  }
}
