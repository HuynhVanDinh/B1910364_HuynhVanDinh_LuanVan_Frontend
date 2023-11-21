import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiemCanboService {
  private baseUrl = 'http://localhost:9004/api/diemcanbo';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getByPhieu(muc_id: number, maSV: number): Observable<any> {
    const url = `${this.baseUrl}/muc/${muc_id}/${maSV}`;
    return this.http.get(url);
  }
}
