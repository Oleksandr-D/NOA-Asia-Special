import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ThaiMarketService } from 'src/app/shared/services/thai-market/thai-market.service';

@Component({
  selector: 'app-thai-market',
  templateUrl: './thai-market.component.html',
  styleUrls: ['./thai-market.component.scss']
})
export class ThaiMarketComponent implements OnInit {
  public thaiWokProducts: Array<IProductResponse> = [];
  public thaiSatayProducts: Array<IProductResponse> = [];
  public thaiLavaGrillProducts: Array<IProductResponse> = [];
  public categories: Array<ICategoryResponse> = [];

  constructor(
    private productService: ProductService,
    private thaiService: ThaiMarketService,
    private orderService: OrderService,
  ){ }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts(): void {
    Promise.all([
      this.productService.getAllByCategoryFirebase("Thai lava grill"),
      this.productService.getAllByCategoryFirebase('Thai wok'),
      this.productService.getAllByCategoryFirebase('Thai satay'),

    ]).then(([ thaiLavaGrillProducts, thaiWokProducts, thaiSatayProducts, ]) => {
      this.thaiWokProducts = thaiWokProducts as IProductResponse[];
      this.thaiSatayProducts = thaiSatayProducts as IProductResponse[];
      this.thaiLavaGrillProducts = thaiLavaGrillProducts as IProductResponse[];
      this.productService.getAllByCategoryFirebase('Thai lava grill')
        .then((data) => {
          this.thaiLavaGrillProducts = data as IProductResponse[];
        })
        .catch((error) => {
          console.log('Error fetching Thai lava grill products:', error);
        });
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
    this.orderService.changeBasket.next(true);
  }

  orderScroll():void {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

}
