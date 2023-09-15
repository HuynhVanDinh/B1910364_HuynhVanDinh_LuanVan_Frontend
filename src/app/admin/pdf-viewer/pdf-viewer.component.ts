import { Component } from '@angular/core';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {
  selectedFile: any = null;
  selectedFilePath: string = '';
  selectedFileB64: string = '';
  isFileImage = false;
  isFileDocument = false;

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  onFileSelected(event: any): void {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles.length > 0) {
      this.selectedFile = selectedFiles[0];

      const reader = new FileReader();

      reader.readAsDataURL(this.selectedFile);


      reader.onload = (event) => {
        const path = event.target?.result as string;
        this.selectedFilePath = path;
        this.selectedFileB64 = this.selectedFilePath.split(',')[1];
        if (this.selectedFile.type.startsWith('image/')) {
          this.isFileImage = true;
          this.isFileDocument = false;
        } else if (this.selectedFile.type === 'application/pdf') {
          this.isFileImage = false;
          this.isFileDocument = true;
        } else {
          this.isFileImage = false;
          this.isFileDocument = false;
        }
      };
    }
  }
}
