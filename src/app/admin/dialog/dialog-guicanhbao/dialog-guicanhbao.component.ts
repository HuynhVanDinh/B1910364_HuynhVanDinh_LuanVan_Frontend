import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-dialog-guicanhbao',
  templateUrl: './dialog-guicanhbao.component.html',
  styleUrls: ['./dialog-guicanhbao.component.css'],
  // styles: [
  //   `
  //     .red-heading {
  //       color: red;
  //       font-size: 20px;
  //     }
  //   `,
  // ],
})
export class DialogGuicanhbaoComponent {
  name: any;
  isLoading: boolean = false;

  constructor(
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogGuicanhbaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }

  accept() {
    this.isLoading = true;
    const SinhvienComponent = this.data.SinhvienComponent;
    SinhvienComponent.sinhvienService.guicanhbao().subscribe(
      () => {
        this.isLoading = false;
        this.toastr.success('Gửi thành công');
        console.log('Gửi thành công');
        SinhvienComponent.getAll();
        this.dialogRef.close('Closed using function');
      },
      (error: any) => {
        this.isLoading = false;
        this.toastr.error('Lỗi');
        console.error('Lỗi:', error);
      }
    );
  }
}
