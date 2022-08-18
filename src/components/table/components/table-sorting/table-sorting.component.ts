import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.less']
})
export class TableSortingComponent implements OnInit {
  /** columns
   * @description Column data under filtering,
   * */
  @Input() columns: { value: string; title: string }[] = [];

  /** handleSorting
   * @description Sending data to the child element of the sorting data,
   * */
  @Output() handleSorting: EventEmitter<{ field: string , direction: string }>
    = new EventEmitter();

  /** direction
   * @description Types of sorting directions
   * */
  public direction: "asc" | "desc" = "asc";

  /** sortField
   * @description Selected sorting item
   * */
  public sortField: string = '';

  /** ngOnInit
   * @description Writing the first sorting item in the field,
   * */
  ngOnInit(): void {
    this.sortField = this.columns[0].value;
  }

  /** selectSortField
   * @description Writing an id under sorting and sending it to a child element,
   * @param {  string | number} item:  id under sorting
   * */
  selectSortField(item: string | number) {
    this.sortField = item as string;
    this.handleSorting.emit({field: this.sortField, direction: this.direction});
  }

  /** changeDirection
   * @description change the direction and send it to the child element,
   * */
  changeDirection() {
    this.direction = this.direction === "asc" ? "desc" : "asc";
    this.handleSorting.emit({field: this.sortField, direction: this.direction});
  }
}
