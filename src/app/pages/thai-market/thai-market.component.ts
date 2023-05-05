import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ThaiMarketService } from 'src/app/shared/services/thai-market/thai-market.service';

@Component({
  selector: 'app-thai-market',
  templateUrl: './thai-market.component.html',
  styleUrls: ['./thai-market.component.scss']
})
export class ThaiMarketComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  public categories: Array<ICategoryResponse> = [];

  constructor(
    private productService: ProductService,
    private thaiService: ThaiMarketService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllByCategoryFirebase('Thai satay').then((data) => {
      this.userProducts = data as IProductResponse[];
    });
  }

  loadCategories(): void {
    this.thaiService.getAllFirebase().subscribe((data) => {
    this.categories = data as ICategoryResponse[];
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    //this.orderService.changeBasket.next(true);
  }



}
