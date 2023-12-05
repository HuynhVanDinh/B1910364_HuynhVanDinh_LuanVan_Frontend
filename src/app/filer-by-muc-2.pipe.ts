import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filerByMuc2',
})
export class FilerByMuc2Pipe implements PipeTransform {
  transform(items: any[], mucTen: string): any[] {
    console.log("items",items)

    const a = items.filter(
      (item) => item.phieuDiemGiangvien.mucDG.tenMuc === mucTen
    );
     console.log("ket qua nè",a);
    return a;

  }
}
