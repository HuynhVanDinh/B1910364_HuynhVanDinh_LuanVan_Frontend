import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.css'],
})
export class PdfDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
