import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KetquaService {
  private baseUrl = 'http://localhost:9004/api/ketquathuctap';
  constructor(private http: HttpClient) {}
  getAllKetQuaThucTap(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllKetQuaThucTapBySinhVien(masv: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/masv/${masv}`);
  }
}
