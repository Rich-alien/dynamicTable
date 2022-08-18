import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {ProductType} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {PRODUCT_DATA} from "../consts/const";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productData: ProductType[] = PRODUCT_DATA

  constructor(public http: HttpClient) {
  }

  getProductList(): Observable<ProductType[]> {
    return this.http
      .get<ProductType[]>(`${environment.apiUrl}product/`)
      .pipe(
        map((productList: ProductType[]) => {
          return productList;
        }),
        catchError(() => of(this.productData)));
  }
}
