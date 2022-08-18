import {ProductType} from "./product.model";
import {DropDownType} from "./drop-down.model";

export  type TableType = {
  header: TableHeaderType[],
  data: ProductType[]
};

export  type TableHeaderType = {
  value: string,
  title: string,
  isFiltered: boolean,
  isSorted: boolean,
};
export type TablePagination = {
  currentPage: number;
  countPages: number[];
  countItems: number;
  listOfCountItems: DropDownType[];
}
