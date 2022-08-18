import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {ProductType} from "../../models/product.model";
import {TablePagination, TableType} from "../../models/table.model";
import {FilterOutputType} from "../../models/filter.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  /** tableData
   * @description Table header data and its contents */
  @Input()
  tableData: TableType = {
    header: [],
    data: []
  };
  /** pagination
   * @description Pagination for the table: the selected page,
   * the number of pages, the number of elements
   * to display the table, the list of options,
   * the number of items to display in the table  */
  public pagination: TablePagination = {
    currentPage: 0,
    countPages: [],
    countItems: 5,
    listOfCountItems: [
      {value: 5, title: 5},
      {value: 10, title: 10},
      {value: 15, title: 15},
      {value: 20, title: 20}]
  }

  /** temporaryTableData
   * @description  Temporary table for modifications (sorting, filtering) */
  public temporaryTableData: ProductType[][] = [];

  /** sortColumns
   * @description  Columns for sorting */
  public sortColumns: { value: string; title: string }[] = [];

  /** isSort
   * @description  If the header does not have any columns for sorting, then the component will be hidden */
  public isSort: boolean = false;

  /** filterValues
   * @description  Filtering history  */
  public filterValues: FilterOutputType[] | null = null

  /** sortingValue
   * @description  Sorting history  */
  public sortingValue: { field: string; direction: string } | null = null

  /** ngOnInit
   * @description  Table pagination, sorting data collection, sorting the first column  */
  public ngOnInit(): void {
    this.temporaryTableData = this.spliceTable(this.tableData.data, this.pagination.countItems);
    this.generateSortColumnList();
    if (this.isSort) {
      this.onSort({field: this.sortColumns[0].value, direction: 'asc'});
    }
  }

  /** generateSortColumnList
   * @description  Data processing for sorting  */
  private generateSortColumnList() {
    this.sortColumns = this.tableData.header
      .filter(item => {
        return item.isSorted
      }).map((item) => {
        return {value: item.value, title: item.title}
      })
    this.isSort = !!this.sortColumns.length
  }

  /** spliceTable
   * @description  Dividing the table into parts,
   * @param {ProductType[]} data: Table data
   * @param {number} count: Number of elements per table page*/
  private spliceTable(data: ProductType[], count: number) {
    const result = [];
    const dataForCut = [...data]
    while (dataForCut.length > 0) {
      const chunk = dataForCut.splice(0, count);
      result.push(chunk);
    }
    this.pagination.currentPage = 0;
    this.pagination.countPages = this.getListOfNumber(result.length);
    return result;
  }

  /** getTableRowData
   * @return {[string, string | number][]} row key and value - Array<string, string | number>
   * @param {ProductType} item: Table data
   * @description Returns the values for the row in the table */
  public getTableRowData(item: ProductType): [string, string | number][] {
    return Object.entries(item);
  }

  /** changeNumberOfElements
   * @param {number} count: number of elements
   * @description Change the number of elements on the page
   * If there is sorting or filter data, then additional processing is performed*/
  public changeNumberOfElements(count: number | string) {
    this.pagination.countItems = +count;
    let data = this.tableData.data;
    if (this.filterValues) {
      data = this.filterBy(this.filterValues, data);
    }
    if (this.sortingValue) {
      data = this.sortElements(this.sortingValue, data);
    }
    this.temporaryTableData = this.spliceTable(data, this.pagination.countItems);

  }

  /** getListOfNumber
   * @description  List of pages to display in the pagination,
   * @return {number[]} array of numbers
   * @param {number} count: Number of pages*/
  public getListOfNumber(count: number): number[] {
    return Array.from({length: count}, (element, index) => index + 1);
  }

  /** changePage
   * @description  Changing the page in the table,
   * @param {number} number: page number*/
  public changePage(number: number) {
    this.pagination.currentPage = --number;
  }

  /** isActivePosition
   * @description  Returns boolean the value of the selected button to highlight it among others,
   * @return {boolean} If it matches, then true
   * @param {number} number: Page number
   * @param {number} currentPage: Page number of the selected page
   * */
  public isActivePosition(number: number, currentPage: number): boolean {
    return --number === currentPage;
  }

  /** isVisible
   * @description  If there is no id in the table header list, it is not shown in the table,
   * @return {boolean} If it matches, then true
   * @param {string} id: id data
   * */
  public isVisible(id: string): boolean {
    const idsTable: string[] = this.tableData.header.map((element) => {
      return element.value
    })
    return idsTable.includes(id);
  }

  /** onSort
   * @description  Getting sorting data from a component,
   * sorting itself and filtering if there was one before and then splitting the table into parts again,
   * @param { field: string; direction: string } sortValue: the subject of sorting and direction
   * */
  public onSort(sortValue: { field: string; direction: string }) {
    this.sortingValue = sortValue;
    let data = this.sortElements(sortValue);
    if (this.filterValues) {
      data = this.filterBy(this.filterValues, data);
    }
    this.temporaryTableData = this.spliceTable(data, this.pagination.countItems);
  }

  /** sortElements
   * @description  This block is responsible for sorting, which can be used together with filtering,
   * @param { field: string; direction: string } sortValue: the subject of sorting and direction
   * @param { ProductType[] | null } transportData: Data after filtering if she is not there, she will pass without it.
   * @return {ProductType[]} Data after filtering and sorting
   * */
  private sortElements(sortValue: { field: string; direction: string }, transportData: ProductType[] | null = null): ProductType[] {
    let data: ProductType[] = transportData ?? [...this.tableData.data]
    data = data.sort(
      this.sortBy(
        sortValue.field,
        sortValue.direction === 'desc',
        this.hisPrimerValue(sortValue.field)))
    return data;
  }

  /** sortBy
   * @description  The sorting function argument adds an advantage over the standard one with the ability to filter strings or numbers,
   * @param { string } field: grading key
   * @param {boolean | number } reverse: sort order.
   * @param {boolean } primer:type of data.
   * @return {any} Returns the ready function for the sorting method
   * */
  private sortBy = (field: string, reverse: boolean | number, primer: boolean): any => {
    const key = primer ?
      (object: any) => {
        return parseInt(object[field])
      } :
      (object: any) => {
        return object[field]
      };
    reverse = !reverse ? 1 : -1;
    return function (a: ProductType, b: ProductType) {
      // @ts-ignore
      return a = key(a), b = key(b), (reverse as number) * ((a > b) - (b > a));
    }
  }

  /** hisPrimerValue
   * @description  Checking for key data type,
   * @param { string } field: grading key
   * @return {boolean} If the data type is a number, it returns true
   * */
  public hisPrimerValue(field: string): boolean {
    // @ts-ignore
    return typeof this.tableData.data[0][field] === 'number'
  }

  /** filterTable
   * @description  Filtering item and sorting if there was data about it ,
   * @param {  FilterOutputType[]} filterElements: the subject of filter
   * */
  filterTable(filterElements: FilterOutputType[]) {
    this.filterValues = [...filterElements];
    let data: ProductType[] = this.filterBy(filterElements);
    if (this.sortingValue) {
      data = this.sortElements(this.sortingValue, data);
    }
    this.temporaryTableData = this.spliceTable(data, this.pagination.countItems);
  }
  /** filterBy
   * @description Filtering an object with sorted data  ,
   * @param {  FilterOutputType[]} filterElements: the subject of filter
   * @param {  ProductType[] | null = null} dataSort: Data after sorting
   * @return {  ProductType[] } Data after sorting and filtering
   * */
  filterBy(filterElements: FilterOutputType[], dataSort: ProductType[] | null = null): ProductType[] {
    let filterData: ProductType[] = dataSort ?? [...this.tableData.data];
    filterElements.forEach((item: FilterOutputType) => {
      filterData = filterData.filter((element) => {
        // @ts-ignore
        return element[item.type] >= item.value
      })
    })
    return filterData;
  }

}
