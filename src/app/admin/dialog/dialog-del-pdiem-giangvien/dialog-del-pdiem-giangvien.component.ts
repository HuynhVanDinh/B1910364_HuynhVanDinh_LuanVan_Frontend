import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-dialog-del-pdiem-giangvien',
  templateUrl: './dialog-del-pdiem-giangvien.component.html',
  styleUrls: ['./dialog-del-pdiem-giangvien.component.css'],
})
export class DialogDelPdiemGiangvienComponent {
  isLoading: boolean = false;
  name: any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogDelPdiemGiangvienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm để xóa
  accept() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    console.log(this.data);
    const code = this.data.code;
    const PhieudiemComponent = this.data.PhieudiemComponent;

    // this.fileUploadService.deleteFile(image).subscribe(() => {
    PhieudiemComponent.phieudiemGiangvienService
      .delete(code, authToken)
      .subscribe(
        () => {
          this.isLoading = false;
          this.toastr.success('Xoá thành công');
          console.log('Xóa thành công');
          PhieudiemComponent.getByMuc();
          this.dialogRef.close('Closed using function');
          // Xử lý logic sau khi xóa thành công
        },
        (error: any) => {
          this.toastr.error('Lỗi xóa loại cơ sở');
          console.error('Lỗi xóa loại cơ sở:', error);
          // Xử lý logic khi có lỗi xảy ra
        }
      );
    // });
  }
}
