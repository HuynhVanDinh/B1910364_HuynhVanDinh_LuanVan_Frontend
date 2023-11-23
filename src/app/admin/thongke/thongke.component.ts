import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelDiemService } from 'src/app/excel-diem.service';
import { KetquaService } from 'src/app/ketqua.service';
import { PdfService } from 'src/app/pdf.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css'],
})
export class ThongkeComponent implements OnInit {
  isLoading: boolean = false;
  url!: any;
  keyword: string = '';
  constructor(
    private pdfService: PdfService,
    private excelDiemService: ExcelDiemService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    // this.generatePdf();
  }
  generatePdf(): void {
    this.isLoading = true;
    this.pdfService.getKetquaThuctapPdf(this.keyword).subscribe(
      (pdfBlob: Blob) => {
        this.isLoading = false;
        this.toastr.success('Tìm thành công');
        this.url = URL.createObjectURL(pdfBlob);
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error();
        ('Tìm thất bại !!!');
        console.error('Error fetching PDF', error);
      }
    );
  }
  generateExcel(): void {
    this.isLoading = true;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.excelDiemService.exportDiemToExcel(authToken, this.keyword).subscribe(
      (data) => {
        this.isLoading = false;
        this.toastr.success('Xuất excel thành công');
        console.log(data);
      },
      (error) => {
        this.toastr.error();
        ('Xuất excel thất bại !!!');
        console.log('Lỗi');
      }
    );
  }
}
