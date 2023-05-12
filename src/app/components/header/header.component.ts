import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ThaiMarketService } from 'src/app/shared/services/thai-market/thai-market.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   public isMenuOpen = false;
   public categories: Array<ICategoryResponse> = [];
   public thaiMarketCategories: Array<ICategoryResponse> = [];
   public basket: Array<IProductResponse> = [];
   public total = 0;
   public count = 0;

   constructor(
    private categoryService: CategoryService,
    private thaiService: ThaiMarketService,
    private orderService: OrderService,
  ) {}

   ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
    this.categories = data as ICategoryResponse[];
    this.thaiService.getAllFirebase().subscribe((data) => {
      this.thaiMarketCategories = data as ICategoryResponse[];
      });
    });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,0);
    this.count = this.basket.reduce(
      (total: number, prod: IProductResponse) => total + prod.count,
      0
    );
  }  

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  } 

}
