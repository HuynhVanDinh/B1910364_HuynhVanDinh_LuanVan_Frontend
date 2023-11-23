import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:9004/api/pdf';
  exportKhoaToPdf(): Observable<Blob> {
    // Gửi yêu cầu GET đến API để tạo tệp PDF
    return this.http.get(this.baseUrl + '/khoa', { responseType: 'blob' });
  }
  exportLopToPdf(): Observable<Blob> {
    // Gửi yêu cầu GET đến API để tạo tệp PDF
    return this.http.get(this.baseUrl + '/lop', { responseType: 'blob' });
  }

  exportDonViToPdf(): Observable<Blob> {
    // Gửi yêu cầu GET đến API để tạo tệp PDF
    return this.http.get(this.baseUrl + '/donvi', { responseType: 'blob' });
  }
  getKetquaThuctapPdf(keyword?: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
    });

    // Explicitly define the type of params
    const params: HttpParams = keyword
      ? new HttpParams().set('keyword', keyword)
      : new HttpParams();

    return this.http
      .get(`${this.baseUrl}/ketquathuctap`, {
        responseType: 'arraybuffer',
        headers,
        params,
      })
      .pipe(
        map(
          (arrayBuffer: ArrayBuffer) =>
            new Blob([arrayBuffer], { type: 'application/pdf' })
        )
      );
  }
  getKetquaThuctapByGiangvienPdf(maGv: number,keyword?: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
    });

    // Explicitly define the type of params
    const params: HttpParams = keyword
      ? new HttpParams().set('keyword', keyword)
      : new HttpParams();

    return this.http
      .get(`${this.baseUrl}/ketquathuctap/${maGv}`, {
        responseType: 'arraybuffer',
        headers,
        params,
      })
      .pipe(
        map(
          (arrayBuffer: ArrayBuffer) =>
            new Blob([arrayBuffer], { type: 'application/pdf' })
        )
      );
  }
}
