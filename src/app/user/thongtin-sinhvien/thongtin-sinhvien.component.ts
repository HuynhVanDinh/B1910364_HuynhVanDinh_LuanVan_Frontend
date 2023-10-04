import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SinhvienService } from 'src/app/sinhvien.service';
import { DialogPdfComponent } from '../dialog/dialog-pdf/pdf-dialog.component';

@Component({
  selector: 'app-thongtin-sinhvien',
  templateUrl: './thongtin-sinhvien.component.html',
  styleUrls: ['./thongtin-sinhvien.component.css'],
})
export class ThongtinSinhvienComponent implements OnInit {
  datas: any;

  constructor(
    private sinhvienService: SinhvienService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getSinhVien();
  }

  getSinhVien(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.sinhvienService.getSinhVien(accountid).subscribe({
        next: (res) => {
          this.datas = res;
          console.log(this.datas);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  exportToPdf(url: string) {
    // this.pdfService.exportKhoaToPdf().subscribe((response) => {
    //   const blob = new Blob([response], { type: 'application/pdf' });
    console.log(url);
    this.dialog.open(DialogPdfComponent, {
      width: '900px',
      height: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { url },
      disableClose: true,
    });
  }
}
