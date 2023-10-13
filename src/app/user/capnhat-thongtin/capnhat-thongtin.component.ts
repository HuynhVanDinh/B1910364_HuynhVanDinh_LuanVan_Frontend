import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-capnhat-thongtin',
  templateUrl: './capnhat-thongtin.component.html',
  styleUrls: ['./capnhat-thongtin.component.css'],
})
export class CapnhatThongtinComponent implements OnInit {
  sinhVien: any;
  maSV: string | null;
  @ViewChild('fileInput') fileInput: any;
  isLoading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private sinhvienService: SinhvienService
  ) {
    this.maSV = this.route.snapshot.queryParamMap.get('maSV');
  }
  ngOnInit(): void {
    // console.log(this.maSV);
    this.getSinhVienDetails(this.maSV!);
  }
  getSinhVienDetails(id: string): void {
    this.sinhvienService.getSinhVienById(id).subscribe((data) => {
      this.sinhVien = data;
      console.log(this.sinhVien);
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
      const filename = this.sinhVien.hinhAnh;
      console.log(filename, file);
      this.isLoading = true;
      this.fileUploadService
        .updateFile(filename, file)
        .subscribe((response) => {
          console.log('Update successful:', response);
          const hinhAnh = response.filename;
          this.sinhvienService
            .updateAvt(this.maSV, hinhAnh, authToken)
            .subscribe(
              (data) => {
                this.isLoading = false;
                this.toastr.success(data.message);
                console.log('File uploaded successfully:', data);
                this.getSinhVienDetails(this.maSV!);
              },
              (error: any) => {
                this.isLoading = false;
                this.toastr.error('Lỗi cập nhật ảnh diện');
                console.error('Lỗi cập nhật ảnh diện', error);
              }
            );
        });

      // Here, you can make an HTTP POST request to upload the file to your server
      // Example: You can use the Angular HttpClient to post the file to your server
      // this.httpClient.post('your-upload-endpoint', formData).subscribe(
      //   (response) => {
      //     console.log('File uploaded successfully:', response);
      //     // Handle the response from the server
      //   },
      //   (error) => {
      //     console.error('File upload failed:', error);
      //     // Handle any errors that occur during the upload
      //   }
      // );
    } else {
      console.error('No file selected.');
      // Show an error message or take appropriate action
    }
  }
}
