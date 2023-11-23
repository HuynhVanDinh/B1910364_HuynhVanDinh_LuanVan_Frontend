import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filerByMuc2',
})
export class FilerByMuc2Pipe implements PipeTransform {
  transform(items: any[], mucTen: string): any[] {
    return items.filter(
      (item) => item.phieuDiemGiangvien.mucDG.tenMuc === mucTen
    );
  }
}
