import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-thai-product-info',
  templateUrl: './thai-product-info.component.html',
  styleUrls: ['./thai-product-info.component.scss']
})
export class ThaiProductInfoComponent implements OnInit, OnDestroy {
  public currentProduct!: IProductResponse;
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private orderService:OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getOneProduct();
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  getOneProduct():void{
    const PRODUCT_ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneFirebase(PRODUCT_ID as string).subscribe(data =>{
      this.currentProduct = data as IProductResponse;
      const favorites: Array<IProductResponse> = JSON.parse(localStorage.getItem('favorites') as string);
        if (favorites) {
          const favoriteProduct = favorites.find((fav) => fav.id === this.currentProduct.id);
          if (favoriteProduct) {
            this.currentProduct.favorites = favoriteProduct.favorites;
          }
        }
    })
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
    let basket: Array < IProductResponse >= [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
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
        this.currentProduct.favorites = !this.currentProduct.favorites;
        product.favorites = favorites[index].favorites;
            if (!favorites[index].favorites) {
            favorites.splice(index, 1);
          }
        } else {
          this.currentProduct.favorites = !this.currentProduct.favorites;
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
