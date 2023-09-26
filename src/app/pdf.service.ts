import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
