import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-openwarning',
  templateUrl: './openwarning.component.html',
  styles: [
    `
      .red-heading {
        color: red;
      }
    `,
  ],
})
export class OpenwarningComponent {
  name: any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<OpenwarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm để xóa
  accept() {
    const code = this.data.code;
    const image = this.data.image;
    const LoaicosoComponent = this.data.LoaicosoComponent;

    this.fileUploadService.deleteFile(image).subscribe(() => {
      LoaicosoComponent.loaicosoService.xoaLoaiCoSo(code).subscribe(
        () => {
          this.toastr.success('Xoá thành công');
          console.log('Xóa thành công');
          LoaicosoComponent.getAll();
          this.dialogRef.close('Closed using function');
          // Xử lý logic sau khi xóa thành công
        },
        (error: any) => {
          this.toastr.error('Lỗi xóa loại cơ sở');
          console.error('Lỗi xóa loại cơ sở:', error);
          // Xử lý logic khi có lỗi xảy ra
        }
      );
    });
  }
}
