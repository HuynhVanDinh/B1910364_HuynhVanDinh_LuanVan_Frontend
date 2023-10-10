import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import { DangkiService } from 'src/app/dangki.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-thongtin-dangki',
  templateUrl: './thongtin-dangki.component.html',
  styleUrls: ['./thongtin-dangki.component.css'],
})
export class ThongtinDangkiComponent implements OnInit {
  baidangId: string | null;
  diemFile: File | undefined;
  cvFile: File | undefined;
  selectedFileNameDiem = '';
  selectedFileNameCv = '';
  isLoading: boolean = false;
  sinhVienId!: number;
  constructor(
    private toastr: ToastrService,
    private sinhvienService: SinhvienService,
    private dangkiService: DangkiService,
    private pdfService: NgxExtendedPdfViewerService,
    private route: ActivatedRoute
  ) {
    this.baidangId = this.route.snapshot.queryParamMap.get('baidangId');
  }
  ngOnInit(): void {
    console.log(this.baidangId);
  }

  onSubmit() {
    if (this.diemFile && this.cvFile) {
      this.isLoading = true;
      const accountid = localStorage.getItem('accountid');
      this.sinhvienService.getSinhVien(accountid).subscribe((data) => {
        this.sinhVienId = data.maSV;
        console.log(this.sinhVienId);
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          // console.log(authToken);
          console.error('Access token not found. User is not authenticated.');
          return;
        }
        console.log(
          'hfhjfdghdgh',
          this.cvFile!.name,
          this.diemFile!.name,
          this.baidangId,
          this.sinhVienId,
          authToken
        );
        this.dangkiService
          .createDangky(
            this.cvFile!.name,
            this.diemFile!.name,
            this.baidangId,
            this.sinhVienId,
            authToken
          )
          .subscribe(
            (data) => {
              console.log('data', data);
              this.isLoading = false;
              this.toastr.success(data.message);
            },
            (error) => {
              console.log('Login error:', error);
              this.isLoading = false;
              this.toastr.error(error.error.message);
            }
          );
      });
    }
  }

  // Xử lý sự kiện khi có thay đổi tệp đính kèm
  onFileChange(event: Event, fileType: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const file = inputElement.files[0];
      if (fileType === 'diem') {
        this.diemFile = file;
        this.selectedFileNameDiem = file.name; // Đặt tên tệp cho biến selectedFileNameDiem
      } else if (fileType === 'cv') {
        this.cvFile = file;
        this.selectedFileNameCv = file.name; // Đặt tên tệp cho biến selectedFileNameCv
      }
    }
  }
}
