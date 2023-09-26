import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-del-upload',
  templateUrl: './del-upload.component.html',
  styles: [
    `
      .red-heading {
        color: red;
      }
    `,
  ],
})
export class DelUploadComponent {
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DelUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }

  accept() {
    const code = this.data.code;
    const FileUploadComponent = this.data.FileUploadComponent;
    FileUploadComponent.fileUploadService.deleteFile(code).subscribe(
      () => {
        this.toastr.success('Xoá thành công');
        console.log('File deleted successfully');
        FileUploadComponent.getFileData();
        this.dialogRef.close('Closed using function');
      },
      (error: any) => {
        this.toastr.error('Lỗi xoá file !!!');
        console.log('Error:', error);
      }
    );
  }
}
