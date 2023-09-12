import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KhoaService {
  private baseUrl = 'http://localhost:9004/api/khoa';

  constructor(private http: HttpClient) {}
  getAllKhoa(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

}
