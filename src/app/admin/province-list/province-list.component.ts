import { Component } from '@angular/core';
import { ProvinceService } from 'src/app/province.service';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.css'],
})
export class ProvinceListComponent {
  provinces: any[] = [];
  districts: any[] = [];
  communes: any[] = [];

  selectedProvince: any = null;
  selectedDistrict: any = null;
  selectedCommune: any = null;

  constructor(private provinceService: ProvinceService) {}

  ngOnInit(): void {
    this.provinceService.getProvinces().subscribe((data) => {
      this.provinces = data;
    });
  }

  onProvinceChange() {
    if (this.selectedProvince) {
      console.log(this.selectedProvince);
      this.provinceService
        .getDistrictsByProvinceCode(this.selectedProvince)
        .subscribe((data: any) => {
          // console.log(data);
          this.districts = data.districts;
          this.selectedDistrict = null;
          this.selectedCommune = null;
        });
    } else {
      this.districts = [];
      this.communes = [];
      this.selectedDistrict = null;
      this.selectedCommune = null;
    }
  }

  onDistrictChange() {
   if (this.selectedDistrict) {
     this.provinceService
       .getCommunesByDistrictCode(this.selectedDistrict)
       .subscribe((data: any) => {
        //  console.log(data);
         this.communes = data.wards;
         this.selectedCommune = null;
       });
   } else {
     this.communes = [];
     this.selectedCommune = null;
   }
  }
}
