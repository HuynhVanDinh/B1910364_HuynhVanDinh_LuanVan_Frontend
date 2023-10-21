import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css'],
})
export class PicklistComponent implements OnInit {
  sourceList: string[] = ['Mục 1', 'Mục 2', 'Mục 3', 'Mục 4', 'Mục 5', 'Mục 6'];
  targetList: string[] = [];
  searchText: string = '';
  ngOnInit() {
    this.targetList = [];
  }
  constructor(private cdr: ChangeDetectorRef) {}
  onSubmit() {
    // Xử lý logic khi người dùng nhấn nút "Gửi"
    console.log('Danh sách đích:', this.targetList);
  }
}
