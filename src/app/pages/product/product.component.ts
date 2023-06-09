import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public userProducts: Array < IProductResponse >= [];
  private eventSubscription!: Subscription;
  public categories: Array<ICategoryResponse> = [];
  public sortOption: string = '1';
  
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private orderService: OrderService,
  ){
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
    this.categories = data as ICategoryResponse[];
    });
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

  toTop():void{
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
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
}
