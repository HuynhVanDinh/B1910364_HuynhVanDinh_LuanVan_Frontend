import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  private baseUrl = 'https://provinces.open-api.vn/api/';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}p`);
  }

  getDistrictsByProvinceCode(provinceCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}p/${provinceCode}?depth=2`);
  }

  getCommunesByDistrictCode(districtCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}d/${districtCode}?depth=2`);
  }
}
