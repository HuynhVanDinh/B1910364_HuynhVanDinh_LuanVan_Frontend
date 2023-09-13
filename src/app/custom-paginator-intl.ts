import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Số mục trên mỗi trang:';
  override nextPageLabel = 'Trang tiếp theo';
  override previousPageLabel = 'Trang trước đó';
  override firstPageLabel = 'Trang đầu tiên';
  override lastPageLabel = 'Trang cuối cùng';

  // Định nghĩa các chuỗi văn bản cho phần range (phạm vi)
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 trang ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} của ${length}`;
  };
}
