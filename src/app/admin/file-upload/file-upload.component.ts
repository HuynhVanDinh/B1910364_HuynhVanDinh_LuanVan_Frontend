import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from '../../file-upload.service';
import { DelUploadComponent } from '../dialog/del-upload/del-upload.component';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  files!: any[];
  selectedFile: File | undefined;
  isZoomed = false;
  fileData: any;
  imageSrc!: string;

  constructor(
    private fileUploadService: FileUploadService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFileData();
    this.getFile();
  }

  // changeImage(id: string, imagePath: string) {
  //   const mainImg = document.getElementById(id) as HTMLImageElement;
  //   mainImg.src = imagePath;
  // }

  openDialog(code: any): void {
    this.dialog.open(DelUploadComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      //truyền thuộc tính sang DialogAnimationsDialog
      data: {
        code: code,
        FileUploadComponent: this,
      },
      disableClose: true,
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpdateFileSelected(event: any, filename: string) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      selectedFile.filename = filename;
      this.selectedFile = selectedFile;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Upload successful:', response);
          // Refresh file data
          this.getFileData();
          // Reset selected file
          this.selectedFile = undefined;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

  // deleteFile(filename: string) {
  //   this.fileUploadService.deleteFile(filename).subscribe(
  //     () => {
  //       console.log('File deleted successfully');
  //       // Refresh file data
  //       this.getFileData();
  //     },
  //     (error) => {
  //       console.log('Error:', error);
  //     }
  //   );
  // }

  updateFile(filename: string) {
    if (this.selectedFile) {
      this.fileUploadService.updateFile(filename, this.selectedFile).subscribe(
        (response) => {
          console.log('Update successful:', response);
          // Refresh file data
          this.getFileData();
          // Reset selected file
          this.selectedFile = undefined;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

  private getFileData() {
    this.fileUploadService.getFileData().subscribe(
      (data) => {
        this.files = data;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  downloadFile(filename: string) {
    // const filename = 'co-viet-nam-2.jpg';
    this.fileUploadService.getFileOneData(filename).subscribe(
      (data: Blob) => {
        // Xử lý dữ liệu trả về, ví dụ như tạo URL tải xuống
        const downloadUrl = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
      },
      (error) => {
        // Xử lý lỗi
        console.log('Lỗi !!!:', error);
      }
    );
  }

  getFile() {
    const filename = 'co-viet-nam-2.jpg';
    this.fileUploadService.getFileOneData(filename).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.log('Lỗi !!!:', error);
      }
    );
  }
}
