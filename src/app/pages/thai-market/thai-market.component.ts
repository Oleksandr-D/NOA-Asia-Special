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

      const favorites: Array<IProductResponse> = JSON.parse(localStorage.getItem('favorites') as string);
      if (favorites) {
        this.updateFavoritesStatus(this.thaiWokProducts, favorites);
        this.updateFavoritesStatus(this.thaiSatayProducts, favorites);
        this.updateFavoritesStatus(this.thaiLavaGrillProducts, favorites);
      }
    });
  }

  private updateFavoritesStatus(products: Array<IProductResponse>, favorites: Array<IProductResponse>): void {
    for (const product of products) {
      const favoriteProduct = favorites.find((fav) => fav.id === product.id);
      if (favoriteProduct) {
        product.favorites = favoriteProduct.favorites;
      }
    }
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
