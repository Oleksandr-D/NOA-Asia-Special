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
      const favorites: Array<IProductResponse> = JSON.parse(localStorage.getItem('favorites') as string);
      if (favorites) {
        for (const product of this.userProducts) {
          const favoriteProduct = favorites.find((fav) => fav.id === product.id);
          if (favoriteProduct) {
            product.favorites = favoriteProduct.favorites;
          }
        }
      }
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

  toFavorites(product: IProductResponse):void{
    let favorites: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage.getItem('favorites') as string);
      if (favorites.some((prod) => prod.id === product.id)) {
        const index = favorites.findIndex((prod) => prod.id === product.id);
        favorites[index].favorites = !favorites[index].favorites; 
        product.favorites = favorites[index].favorites;
      if (!favorites[index].favorites) {
        favorites.splice(index, 1);
        }
      } else {
        product.favorites = true;
        favorites.push(product);
      }
    } else {
      product.favorites = true;
      favorites.push(product);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  toTop():void{
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

}
