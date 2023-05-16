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
   public isOpen = false;

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

  openModal(): void {
    this.isOpen = !this.isOpen;
    this.orderService.changeBasket.next(true);
  }

  productCount(product: IProductResponse, value: boolean): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (basket.some((prod) => prod.id === product.id)) {
      const index = basket.findIndex((prod) => prod.id === product.id);
      if (value) {
        ++product.count;
        basket[index].count += 1;
      } else if (!value && product.count > 1) {
        --product.count;
        basket[index].count -= 1;
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.getTotalPrice();
    this.orderService.changeBasket.next(true);
  }

  deleteFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex((prod) => prod.id === product.id);
    this.basket.splice(index, 1);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
    if(basket.length === 0 ){
      this.openModal();
    }
  }

  orderScroll():void {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  clearBasket():void{
    localStorage.removeItem('basket');
    let basket: Array<IProductResponse> = [];
    this.basket = basket;
    this.orderService.changeBasket.next(true);
    this.isOpen = false;
  }
 
}
