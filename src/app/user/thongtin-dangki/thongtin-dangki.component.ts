import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

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
  constructor(
    private pdfService: NgxExtendedPdfViewerService,
    private route: ActivatedRoute
  ) {
    this.baidangId = this.route.snapshot.queryParamMap.get('baidangId');
  }
  ngOnInit(): void {
    console.log(this.baidangId);
  }

  onSubmit() {
    if (this.diemFile) {
      // Xử lý tệp bảng điểm ở đây
      console.log(this.diemFile);
    }
    if (this.cvFile) {
      // Xử lý tệp CV ở đây
      console.log(this.cvFile);
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
