import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-huongdan',
  templateUrl: './huongdan.component.html',
  styleUrls: ['./huongdan.component.css'],
})
export class HuongdanComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<HuongdanComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
