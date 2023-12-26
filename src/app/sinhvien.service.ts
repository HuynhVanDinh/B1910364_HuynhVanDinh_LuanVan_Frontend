import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SinhvienService {
  private baseUrl = 'http://localhost:9004/api/sinhvien';

  constructor(private http: HttpClient) {}

  getAllSinhVien(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllSinhVienChuaDangKy(): Observable<any> {
    const url = `${this.baseUrl}/chuadangky`;
    return this.http.get(url);
  }
  guicanhbao(): Observable<any> {
    const url = `${this.baseUrl}/guicanhbao`;
    return this.http.post(url, '');
  }
  getSinhVien(accountid: string | null): Observable<any> {
    const url = `${this.baseUrl}/account/${accountid}`;
    console.log(url);
    return this.http.get(url);
  }
  getSinhVienById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }
  searchSinhVien(tenSV: string, authToken: string) {
    // Tạo URL với tham số tenSV
    const url = `${this.baseUrl}/search?tenSV=${tenSV}`;

    // Tạo tiêu đề (header) chứa token xác thực
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    // Gửi yêu cầu GET đến máy chủ với tiêu đề chứa token
    return this.http.get(url, { headers });
  }
  createSinhVien(
    tensv: string,
    ngaysinh: Date,
    gioitinh: string,
    quequan: string,
    lopId: number | null,
    email: string,
    hinhAnh: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenSV: tensv,
      ngaySinh: ngaysinh,
      gioiTinh: gioitinh,
      queQuan: quequan,
      hinhAnh: hinhAnh,
    };
    return this.http.post<any>(url, body, {
      params: { lopId: lopId!.toString(), email: email },
      headers: headers,
    });
  }
  updateSinhVien(
    masv: number,
    tensv: string,
    ngaysinh: Date,
    gioitinh: string,
    quequan: string,
    lopId: number | null,
    email: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + masv;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenSV: tensv,
      ngaySinh: ngaysinh,
      gioiTinh: gioitinh,
      queQuan: quequan,
    };
    // console.log(body);
    return this.http.put<any>(url, body, {
      params: { lopId: lopId!.toString(), email: email },
      headers: headers,
    });
  }
  createSinhVienFromExcel(file: File, authToken: string): Observable<any> {
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
     headers.append('Content-Type', 'multipart/form-data');
     headers.append('Accept', 'application/json');
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/createFromExcel`, formData, {
      headers: headers,
    });
  }
  editSinhVien(
    masv: string | null,
    tensv: string,
    ngaysinh: Date,
    quequan: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/chinhsua/` + masv;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenSV: tensv,
      ngaySinh: ngaysinh,
      queQuan: quequan,
    };
    // console.log(body);
    return this.http.put<any>(url, body, {
      headers: headers,
    });
  }
  updateAvt(
    masv: string | null,
    hinhAnh: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${masv}/capnhatanhdien`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });

    // Đưa tên tệp hình ảnh vào trực tiếp, không cần bọc trong một đối tượng
    return this.http.put<any>(url, hinhAnh, {
      headers: headers,
    });
  }
}
