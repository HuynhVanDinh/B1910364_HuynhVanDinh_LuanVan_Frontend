import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2',
})
export class Filter2Pipe implements PipeTransform {
  transform(items: any[]): any[] {
    const result: any[] = [];
    const uniqueMucTenSet = new Set(); // Sử dụng Set để lưu trữ các tên mục duy nhất

    for (const item of items) {
      if (!uniqueMucTenSet.has(item.phieuDiemGiangvien.mucDG.tenMuc)) {
        uniqueMucTenSet.add(item.phieuDiemGiangvien.mucDG.tenMuc);
        result.push(item);
      }
    }

    return result;
  }
}
