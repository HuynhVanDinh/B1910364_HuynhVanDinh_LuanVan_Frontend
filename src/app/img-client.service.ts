import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImgClientService {
  constructor(private http: HttpClient) {}
  getDefaultImageAsFile(): Observable<File> {
    return this.http
      .get('assets/imgs/student.png', { responseType: 'blob' })
      .pipe(
        map((blob: BlobPart) => {
          const fileName = 'student.png';
          return new File([blob], fileName);
        })
      );
  }
  getDefaultImageGVAsFile(): Observable<File> {
    return this.http
      .get('assets/imgs/giangvien.png', { responseType: 'blob' })
      .pipe(
        map((blob: BlobPart) => {
          const fileName = 'giangvien.png';
          return new File([blob], fileName);
        })
      );
  }
}
