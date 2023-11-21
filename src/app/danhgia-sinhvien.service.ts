import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DanhgiaSinhvienService {
  private baseUrl = 'http://localhost:9004/api/danhgia';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getDanhGiaSinhVien(id_tuan: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tuan/${id_tuan}`);
  }
}
