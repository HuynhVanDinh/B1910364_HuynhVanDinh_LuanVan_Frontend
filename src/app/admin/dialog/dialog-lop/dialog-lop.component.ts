import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lop } from 'src/app/model/lop.model';

@Component({
  selector: 'app-dialog-lop',
  templateUrl: './dialog-lop.component.html',
  styleUrls: ['./dialog-lop.component.css'],
})
export class DialogLopComponent implements OnInit {
  myForm!: FormGroup;
  datas: Lop[] = [];
  name!: string;
  code!: string;
  quy_mo!: string;
  loai_hinh!: string;
  latitude!: number;
  longitude!: number;
  geojson!: string;
  address!: string;
  image!: string;
  files!: any[];
  selectedFile: File | undefined;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      latitude: new FormControl(),
      longitude: new FormControl(),
      quy_mo: new FormControl(),
      code: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      loai_hinh: new FormControl(),
      file: new FormControl(),
    });
  }
  constructor(
    public dialogRef: MatDialogRef<DialogLopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  refreshForm() {
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
    // if (this.currentMarker) {
    //   this.map.removeLayer(this.currentMarker);
    // }
  }
  themLoaiCoSo(
    name: string,
    code: string,
    quy_mo: string,
    loai_hinh: string,
    latitude: number,
    longitude: number,
    geojson: string,
    address: string,
    image: string
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');

    // if (this.selectedFile) {
    //   this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //     (data) => {
    //       image = data.filename;
    //       this.loaicosoService
    //         .themLoaiCoSo(
    //           name,
    //           code,
    //           quy_mo,
    //           loai_hinh,
    //           latitude,
    //           longitude,
    //           geojson,
    //           address,
    //           image
    //         )
    //         .subscribe(
    //           () => {
    //             this.openProgressSpinner();
    //             this.dialog.closeAll();
    //             this.toastr.success('Thêm thành công');
    //             console.log('Thêm loại cơ sở thành công');
    //             this.LoaicosoComponent.getAll();
    //           },
    //           (error: any) => {
    //             this.dialogRef.close('Closed using function');
    //             this.toastr.error('Lỗi thêm loại cơ sở');
    //             console.error('Lỗi thêm loại cơ sở:', error);
    //           }
    //         );
    //       this.selectedFile = undefined;
    //     }
    //     // (error) => {
    //     //   console.log('Error:', error);
    //     // }
    //   );
    // }
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
