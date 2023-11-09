import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByMuc',
})
export class FilterByMucPipe implements PipeTransform {
  transform(items: any[], mucTen: string): any[] {
    return items.filter((item) => item.mucDG.tenMuc === mucTen);
  }
}
