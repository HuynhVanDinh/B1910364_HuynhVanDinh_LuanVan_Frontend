import { Component, OnInit } from '@angular/core';
import { KetquaService } from 'src/app/ketqua.service';
import { SinhvienService } from 'src/app/sinhvien.service';

@Component({
  selector: 'app-ketqua-thuctap',
  templateUrl: './ketqua-thuctap.component.html',
  styleUrls: ['./ketqua-thuctap.component.css']
})
export class KetquaThuctapComponent implements OnInit{
  listKetQua!: any;
  constructor(private ketQuaThucTapService: KetquaService, private sinhvienService: SinhvienService){

  }
  ngOnInit(): void {
    this.getKetQua();
  }
  getKetQua(){
     const accountid = localStorage.getItem('accountid');
     if (accountid) {
       this.sinhvienService.getSinhVien(accountid).subscribe({
         next: (res) => {
           //  this.datas = res;
          //  console.log(res);
           this.ketQuaThucTapService.getAllKetQuaThucTapBySinhVien(res.maSV).subscribe((data)=>{
             console.log(data);
             this.listKetQua = data;
           })
         },
         error: (error) => {
           console.error(error);
         },
       });
     }

  }

}
