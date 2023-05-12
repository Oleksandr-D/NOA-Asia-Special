import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ThaiMarketService } from '../../shared/services/thai-market/thai-market.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-thai-product',
  templateUrl: './thai-product.component.html',
  styleUrls: ['./thai-product.component.scss']
})
export class ThaiProductComponent implements OnInit, OnDestroy {
  public userProducts: Array<IProductResponse> = [];
  public categories: Array<ICategoryResponse> = [];
  private eventSubscription!: Subscription;
  public currentUrl: string = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private thaiService: ThaiMarketService,
    private orderService: OrderService,
  ){
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
        this.currentUrl = this.router.url;
      }
    })
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  loadProducts():void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategoryFirebase(categoryName).then(data => {
      this.userProducts = data as IProductResponse[];
    })
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
}
