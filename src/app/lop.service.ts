import { HttpClient } from '@angular/common/http';
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
}
