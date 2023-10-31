import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TuanService {
  private baseUrl = 'http://localhost:9004/api/tuan';
  constructor(private http: HttpClient) {}
  getAllTuan(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getTuanCanBo(maCB: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/canbo/${maCB}`);
  }
}
