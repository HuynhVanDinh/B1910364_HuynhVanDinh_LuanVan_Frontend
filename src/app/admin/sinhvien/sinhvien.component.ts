import { Component, OnInit } from '@angular/core';
import { SinhvienService } from '../../sinhvien.service';

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css'],
})
export class SinhvienComponent implements OnInit {
  sinhVienList: any[] = [];

  constructor(private sinhVienService: SinhvienService) {}

  ngOnInit(): void {
    this.getSinhVienList();
  }

  getSinhVienList(): void {
    this.sinhVienService.getAllSinhVien().subscribe((data) => {
      this.sinhVienList = data;
    });
  }
}
