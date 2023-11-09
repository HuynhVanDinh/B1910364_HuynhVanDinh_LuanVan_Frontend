import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[]): any[] {
    const result: any[] = [];
    const uniqueMucTenSet = new Set(); // Sử dụng Set để lưu trữ các tên mục duy nhất

    for (const item of items) {
      if (!uniqueMucTenSet.has(item.mucDG.tenMuc)) {
        uniqueMucTenSet.add(item.mucDG.tenMuc);
        result.push(item);
      }
    }

    return result;
  }
}
