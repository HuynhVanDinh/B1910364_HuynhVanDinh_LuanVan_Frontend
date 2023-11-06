import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GiangvienService } from 'src/app/giangvien.service';
import { DialogPdfComponent } from 'src/app/user/dialog/dialog-pdf/pdf-dialog.component';


@Component({
  selector: 'app-thongtin-giangvien',
  templateUrl: './thongtin-giangvien.component.html',
  styleUrls: ['./thongtin-giangvien.component.css'],
})
export class ThongtinGiangvienComponent implements OnInit {
  datas: any;

  constructor(
    private giangVienService: GiangvienService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getSinhVien();
  }

  getSinhVien(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.giangVienService.getGiangVienByAccount(accountid).subscribe({
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
