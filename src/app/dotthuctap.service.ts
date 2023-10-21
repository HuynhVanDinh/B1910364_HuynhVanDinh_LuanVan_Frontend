import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { format, isValid, parseISO } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class DotthuctapService {
  private baseUrl = 'http://localhost:9004/api/dotthuctap';

  constructor(private http: HttpClient) {}
  getAllDotthuctap(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createDotthuctap(
    tenDot: string,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenDot: tenDot,
      thoiGianBatDau: thoiGianBatDau,
      thoiGianKetThuc: thoiGianKetThuc,
    };
    return this.http.post<any>(url, body, {
      headers: headers,
    });
  }
  editDotthuctap(
    id: number,
    tenDot: string,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenDot: tenDot,
      thoiGianBatDau: thoiGianBatDau,
      thoiGianKetThuc: thoiGianKetThuc,
    };
    return this.http.put<any>(url, body, {
      headers: headers,
    });
  }
  // searchDotthuctap(tenDot: string, authToken: string) {

  //   const url = `${this.baseUrl}/search?tenDot=${tenDot}`;

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${authToken}`,
  //   });

  //   return this.http.get(url, { headers });
  // }
  searchDotThucTap(
    tenDot: string | null,
    thoiGianBatDau: Date | null,
    thoiGianKetThuc: Date | null,
    authToken: string
  ) {
    const url = `${this.baseUrl}/search`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    const params: { [key: string]: string | string[] } = {};
    if (tenDot) {
      params['tenDot'] = tenDot;
    }

    if (thoiGianBatDau && isValid(thoiGianBatDau)) {
      params['thoiGianBatDau'] = format(thoiGianBatDau, 'yyyy-MM-dd');
    }

    if (thoiGianKetThuc && isValid(thoiGianKetThuc)) {
      params['thoiGianKetThuc'] = format(thoiGianKetThuc, 'yyyy-MM-dd');
    }
    console.log("dhdhdh",tenDot,thoiGianBatDau,thoiGianKetThuc);

    return this.http.get(url, { headers, params });
  }
}
