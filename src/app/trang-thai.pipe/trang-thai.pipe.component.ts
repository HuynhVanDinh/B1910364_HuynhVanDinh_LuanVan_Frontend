import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trangThai',
})
export class TrangThaiPipeComponent implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Chờ duyệt';
      case 1:
        return 'Đã duyệt';
      case 2:
        return 'Đã từ chối';
      default:
        return 'Không rõ';
    }
  }
}
