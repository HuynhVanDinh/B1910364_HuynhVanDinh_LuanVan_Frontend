import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelDiemService } from 'src/app/excel-diem.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { PdfService } from 'src/app/pdf.service';

@Component({
  selector: 'app-gv-thongke',
  templateUrl: './gv-thongke.component.html',
  styleUrls: ['./gv-thongke.component.css'],
})
export class GvThongkeComponent {
  isLoading: boolean = false;
  url!: any;
  keyword: string = '';
  constructor(
    private pdfService: PdfService,
    private excelDiemService: ExcelDiemService,
    private giangvienService: GiangvienService,
    private toastr: ToastrService // private pdfService: PdfService,
  ) // private excelDiemService: ExcelDiemService,
  // private toastr: ToastrService
  {}
  ngOnInit(): void {
    // this.generatePdf();
  }
  generatePdf(): void {
    const accountid = localStorage.getItem('accountid');

    this.giangvienService.getGiangVienByAccount(accountid).subscribe((res) => {
      this.isLoading = true;
      this.pdfService
        .getKetquaThuctapByGiangvienPdf(res.maGV, this.keyword)
        .subscribe(
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
    });
  }
  generateExcel(): void {

    const accountid = localStorage.getItem('accountid');

    this.giangvienService.getGiangVienByAccount(accountid).subscribe((res) => {
       this.isLoading = true;
       const authToken = localStorage.getItem('authToken');
       if (!authToken) {
         // console.log(authToken);
         console.error('Access token not found. User is not authenticated.');
         return;
       }
       this.excelDiemService
         .exportDiemGiangVienToExcel(res.maGV,authToken, this.keyword)
         .subscribe(
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
    });
  }
}
