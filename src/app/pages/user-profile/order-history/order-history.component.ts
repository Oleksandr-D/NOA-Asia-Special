import { Component, OnInit } from '@angular/core';
import { IUserResponse } from 'src/app/shared/interfaces/user/user.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public user: IUserResponse = {} as IUserResponse;
  private currentUserId!: string;

  constructor(
    private accountService: AccountService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.currentUserId = user.uid || user.id;
      this.getUser();
    }
  }

  getUser(): void {
    this.accountService.getOneFirebase(this.currentUserId).subscribe((data) => {
      this.user = data as IUserResponse;
      console.log('this.user ==>', this.user);
      this.getUserOrders();
    });
  }

  getUserOrders(): void {
    this.orderService.getUserOrdersFirebase(this.currentUserId).subscribe((order) => {
      this.user.orders = order;
      console.log('Name:', this.user.orders[0]);
    });
    
  }

}
