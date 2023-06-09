import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICheckoutOrder } from 'src/app/shared/interfaces/checkout-order/order.interface.';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket: Array < IProductResponse > = [];
  public total = 0;
  public count = 0;
  public orderForm!:FormGroup;
  public cutrely = 0;
  private currentUserId!: string;
  public userOrder: any= {};
  public user:any = {};

  constructor(
    private orderService: OrderService,
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm();
    this.update();
  }

  update(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.orderForm.patchValue({
        firstName: this.user.firstName,
        surname: this.user.lastName,
        tel: this.user.phoneNumber,
        email: this.user.email,
      });
    }
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      firstName: [null, [Validators.required, ]],
      surname: [null, [Validators.required]],
      tel: [null, [Validators.required, Validators.pattern('^[0-9]{9}$') ]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      delivery: ['pickup', [Validators.required]],
      restaurantAddress:[null, [Validators.required]],
      dataPicker:[null, [Validators.required]],
      timeInterval:[null, [Validators.required]],
      payment:['cashPayment', [Validators.required]],
      change:[null],
      exactPayment:[null],
      comment:[null],
      message:[null],
    });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0);
    this.count = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
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

  cutrelyCount(value: boolean): void {
      if (value) {
        ++this.cutrely;
      } else if (!value && this.cutrely > 1) {
        --this.cutrely;
      }
  }

  deleteFromOrder(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex((prod) => prod.id === product.id);
    this.basket.splice(index, 1);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  toOrder(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && this.basket.length > 0) {
      const user = JSON.parse(currentUser);
      this.currentUserId = user.uid || user.id;
      const basket: Array<IProductResponse> = JSON.parse(localStorage.getItem('basket') as string);
      const checkoutOrder: ICheckoutOrder = { cutrely: this.cutrely, total:this.total };
      const newOrder: IProductResponse = { ...checkoutOrder, ...this.orderForm.value };
      const userOrder: any = { orders: [...basket, newOrder] };
      this.userOrder = userOrder;
      this.createOrder();
    }
    if (this.basket.length == 0){
      this.toastr.warning('Ви нічого не замовили :(');
      this.toastr.info('Будь ласка зробіть замовлення!', '', {timeOut:10000});
    }
    else{
      this.toastr.success('Замовлення прийнято!');
    }
    this.orderForm.reset();
    localStorage.removeItem('basket');
    this.orderService.changeBasket.next(true);
    this.router.navigateByUrl('/');
  }

  createOrder():void{
    this.orderService.createFirebaseOrder(this.userOrder, this.currentUserId).then(() => {
      this.toastr.success('Замовлення прийнято!');
      })
  }

}
