import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';
import { GiangvienService } from 'src/app/giangvien.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-sua-thongtin',
  templateUrl: './sua-thongtin.component.html',
  styleUrls: ['./sua-thongtin.component.css'],
})
export class SuaThongtinComponent {
  giangVien: any;
  maGV: string | null;
  @ViewChild('fileInput') fileInput: any;
  isLoading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    // private sinhvienService: SinhvienService
    private giangVienService: GiangvienService,
  ) {
    this.maGV = this.route.snapshot.queryParamMap.get('maGV');
  }
  ngOnInit(): void {
    // console.log(this.maSV);
    this.getGiangVienDetails(this.maGV!);
  }
  getGiangVienDetails(id: string): void {
    this.giangVienService.getGiangVienById(id).subscribe((data) => {
      this.giangVien = data;
      console.log(this.giangVien);
    });
  }
  selectedFile: string | undefined;
  avatarControl = new FormControl();
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (file.type.match(/^image\//)) {
        // It's an image file, you can handle it here
        this.readImage(file);
        console.log('Selected file is an image:', file);
      } else {
        // It's not an image file, show an error message or take appropriate action
        console.error('Selected file is not an image.');
      }
    }
  }

  readImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedFile = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }
  uploadFile(): void {
    // Get the selected file from the input element
    const fileInput = this.fileInput.nativeElement;
    const file = fileInput.files[0];

    if (file) {
      // You can now upload the 'file' to your server or perform other actions
      console.log('Selected file:', file);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        // console.log(authToken);
        console.error('Access token not found. User is not authenticated.');
        return;
      }
      const filename = this.giangVien.anhGV;
      console.log(filename, file);
      this.isLoading = true;
      this.fileUploadService
        .updateFile(filename, file)
        .subscribe((response) => {
          console.log('Update successful:', response);
          const hinhAnh = response.filename;
          this.giangVienService
            .updateAvt(this.maGV, hinhAnh, authToken)
            .subscribe(
              (data) => {
                this.isLoading = false;
                this.toastr.success(data.message);
                console.log('File uploaded successfully:', data);
                this.getGiangVienDetails(this.maGV!);
              },
              (error: any) => {
                this.isLoading = false;
                this.toastr.error('Lỗi cập nhật ảnh diện');
                console.error('Lỗi cập nhật ảnh diện', error);
              }
            );
        });
    } else {
      console.error('No file selected.');
    }
  }
}
