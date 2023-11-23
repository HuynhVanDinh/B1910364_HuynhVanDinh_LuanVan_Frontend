import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelDiemService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:9004/api/excel';
  // exportDiemToExcel(authToken: string, keyword?: string): Observable<any> {
  //   const url = `${this.baseUrl}/ketquathuctap`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8',
  //     Authorization: `Bearer ${authToken}`,
  //   });
  //   const params: HttpParams = keyword
  //     ? new HttpParams().set('keyword', keyword)
  //     : new HttpParams();
  //   return this.http
  //     .get(url, {
  //       responseType: 'arraybuffer',
  //       headers: headers,
  //       params,
  //     })
  //     .pipe(
  //       map(
  //         (arrayBuffer: ArrayBuffer) =>
  //           new Blob([arrayBuffer], { type: 'application/pdf' })
  //       )
  //     );;
  // }
  exportDiemToExcel(authToken: string, keyword?: string): Observable<any> {
    const url = `${this.baseUrl}/ketquathuctap`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const params: HttpParams = keyword
      ? new HttpParams().set('keyword', keyword)
      : new HttpParams();
    return this.http
      .get(url, {
        responseType: 'arraybuffer',
        headers: headers,
        params,
      })
      .pipe(
        map((arrayBuffer: ArrayBuffer) => {
          // Convert ArrayBuffer to Blob
          const blob = new Blob([arrayBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          // Save the Blob as a file
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', 'exported_data.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      );
  }
  exportDiemGiangVienToExcel(maGv: number,authToken: string, keyword?: string): Observable<any> {
    const url = `${this.baseUrl}/ketquathuctap/${maGv}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const params: HttpParams = keyword
      ? new HttpParams().set('keyword', keyword)
      : new HttpParams();
    return this.http
      .get(url, {
        responseType: 'arraybuffer',
        headers: headers,
        params,
      })
      .pipe(
        map((arrayBuffer: ArrayBuffer) => {
          // Convert ArrayBuffer to Blob
          const blob = new Blob([arrayBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          // Save the Blob as a file
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', 'exported_data.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      );
  }

  // getKetquaThuctapPdf(keyword?: string): Observable<Blob> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/pdf',
  //   });

  //   // Explicitly define the type of params
  //   const params: HttpParams = keyword
  //     ? new HttpParams().set('keyword', keyword)
  //     : new HttpParams();

  //   return this.http
  //     .get(`${this.baseUrl}/ketquathuctap`, {
  //       responseType: 'arraybuffer',
  //       headers,
  //       params,
  //     })
  //     .pipe(
  //       map(
  //         (arrayBuffer: ArrayBuffer) =>
  //           new Blob([arrayBuffer], { type: 'application/pdf' })
  //       )
  //     );
  // }
}
