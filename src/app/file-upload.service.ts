import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = 'http://localhost:8080/file';

  constructor(private http: HttpClient) {}

  getFileData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getFileOneData(filename: string): Observable<any> {
    const url = `${this.apiUrl}/${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getFile(filename: string): Observable<any> {
    const url = `${this.apiUrl}/${filename}`;
    return this.http.get(url);
  }
  uploadFile(file: File): Observable<any> {
    const url = `${this.apiUrl}/upload`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(url, formData);
  }

  updateFile(filename: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/${filename}`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // console.log(formData);
    // return this.http.put<any>(url, formData);
    const kq = this.http.put<any>(url, formData);

    // console.log(file.name);
    return kq;
  }

  deleteFile(filename: string): Observable<any> {
    const url = `${this.apiUrl}/${filename}`;
    return this.http.delete(url);
  }
}
