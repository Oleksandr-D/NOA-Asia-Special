import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from '../interfaces/product/product.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(products: IProductResponse[], sortOption: string): IProductResponse[] {
    if (sortOption === '1') {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOption === '2') {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOption === '3') {
      return products.filter((product) => product.rice);
    } else {
      return products;
    }
  }
}
