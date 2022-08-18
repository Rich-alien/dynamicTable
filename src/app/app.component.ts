import {Component} from '@angular/core';
import {ProductService} from "../services/product.service";
import {PRODUCT_TABLE_HEADER} from "../consts/const";
import {TableType} from "../models/table.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public table: TableType = {
    header: PRODUCT_TABLE_HEADER,
    data: []
  };
  public isReloaded = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(
      (product) => {
        this.table.data = product;
        this.isReloaded = true;
      }
    )
  }

}
